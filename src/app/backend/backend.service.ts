import { Injectable } from "@angular/core";
import { Site as ApiSite } from "./api/models";
import { Site } from "../site/site.model";
import { User } from "../login/user.model";
import { LoginService } from "../login/login.service";
import { CronFormEventType } from "../uploader/cronform.model";
import { SideFileType } from "../uploader/side.model";
import { BackendServiceType } from "./backend.model";
import { ApiService } from "./api/services";
import { NzMessageService } from 'ng-zorro-antd/message'
import { HttpErrorResponse } from "@angular/common/http";
import { OidcSecurityService } from "angular-auth-oidc-client";

function createSiteFromAPI(site: ApiSite) : Site {
    const createDate = new Date(site.dateAdded)
    return new Site(site.name, site.urls.at(0)||'MISSING', createDate, site.cron, site.lastResult)
}

let status: boolean|undefined|null = null

@Injectable({ providedIn: 'root'})
export class BackendService implements BackendServiceType {
    get status() {return status!}
    renewStatus() {
        const pr = this.apiService.pingResponse().subscribe({
            next: (response) => {
                status = response.status < 400
            },
            error: (error) => {
                status = false
            }
        })
    }
    
    constructor(private apiService: ApiService,
                private login: LoginService,
                private msg: NzMessageService,
                private oidcSecurityService: OidcSecurityService) {
        //throw Error('API Service is not implemented yet!')
        if (status === null) {
            status = undefined
            setInterval(()=>this.renewStatus(), 2000);
        }
    }

    async tryLogin(name: string, password: string, shouldRemember: boolean):Promise<User|undefined> {
        return new Promise<User>((resolve, reject) => {
            const subscription = this.apiService.LoginResponse({username: name, password: password}).subscribe({
                next({body}) {
                    if (shouldRemember) {
                        localStorage.setItem('Username', body.name)
                        localStorage.setItem('Expiry', body.expire)
                    }
                    const user = new User(body.name, new Date(body.expire))
                    resolve(user)
                    subscription.unsubscribe()
                },
                error(err: HttpErrorResponse) {reject(err)},
            })
        })
    }
    
    async getSites(): Promise<Site[]> {
        return new Promise<Site[]>((resolve, reject) => {
            const ret:Site[] = []
            this.oidcSecurityService.getConfiguration().subscribe(() => {
                this.apiService.SiteList().forEach((value) => {
                    value.sites.forEach(site => {
                        ret.push(createSiteFromAPI(site))
                    })
                }).then(() => resolve(ret)).catch(err => reject(err))
            })
        })
    }

    async getSiteDetail(name: string): Promise<Site|undefined> {
        return new Promise<Site>((resolve, reject) => {
            this.oidcSecurityService.getConfiguration().subscribe(() => {
                const subscription = this.apiService.SiteItem(name).subscribe({
                    next(site) {resolve(createSiteFromAPI(site)); subscription.unsubscribe()},
                    error(err: HttpErrorResponse) {reject(err)}
                })
            })
        })
    }

    async submitSite(info:CronFormEventType, fileRaw: File, fileData: SideFileType): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const fr = new FileReader()
            const msg = this.msg
            fr.onloadend = () => {
                const subscription = this.apiService.SubmitSiteResponse({
                    name: info.name,
                    cron: info.cron,
                    repository: info.repository,
                    image: info.image,
                    tag: info.tag,
                    retries: info.retries,
                    file: btoa(fr.result as string),
                }).subscribe({
                    next(response) {resolve(response.ok); subscription.unsubscribe()},
                    error(err: HttpErrorResponse) {
                        msg.error(`Error saving data: ${err.error.error} - ${err.error.detail}`)
                        reject(err)
                    }
                })
            }
            fr.readAsText(fileRaw)
        })
    }

    async deleteSite(name: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            const msg = this.msg
            const subscription = this.apiService.SiteItemDeleteResponse(name).subscribe({
                next(response) {resolve(response.ok); subscription.unsubscribe()},
                error(err: HttpErrorResponse) {
                    msg.error(`Error deleting site: ${err.error.error} - ${err.error.detail}`)
                    reject(err)
                },
            })
        })
    }
}