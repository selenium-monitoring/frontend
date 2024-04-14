import { Injectable } from "@angular/core";
import { Site as ApiSite } from "./api/models";
import { Site } from "../site/site.model";
import { User } from "../login/user.model";
import { LoginService } from "../login/login.service";
import { CronFormEventType } from "../uploader/cronform.model";
import { SideFileType } from "../uploader/side.model";
import { BackendServiceType } from "./backend.model";
import { ApiService } from "./api/services";
import { catchError, of } from "rxjs";

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
    
    constructor(private apiService: ApiService, private login: LoginService) {
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
                error(err) {reject(err)},
            })
        })
    }
    
    async getSites(): Promise<Site[]> {
        return new Promise<Site[]>((resolve, reject) => {
            const ret:Site[] = []
            this.apiService.SiteList().forEach((value) => {
                value.sites.forEach(site => {
                    ret.push(createSiteFromAPI(site))
                })
            }).then(() => resolve(ret)).catch(err => reject(err))
        })
    }

    async getSiteDetail(name: string): Promise<Site|undefined> {
        return new Promise<Site>((resolve, reject) => {
            const subscription = this.apiService.SiteItem(name).subscribe({
                next(site) {resolve(createSiteFromAPI(site)); subscription.unsubscribe()},
                error(err) {reject(err)}
            })
        })
    }

    async submitSite(info:CronFormEventType, fileData: SideFileType): Promise<boolean> {
        throw Error('API Service is not implemented yet!')
    }
}