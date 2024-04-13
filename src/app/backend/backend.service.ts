import { Injectable } from "@angular/core";
import { Site as ApiSite } from "./api/models";
import { Site } from "../site/site.model";
import { User } from "../login/user.model";
import { LoginService } from "../login/login.service";
import { CronFormEventType } from "../uploader/cronform.model";
import { SideFileType } from "../uploader/side.model";
import { BackendServiceType } from "./backend.model";
import { ApiService } from "./api/services";

function createSiteFromAPI(site: ApiSite) : Site {
    const createDate = new Date(site.dateAdded)
    return new Site(site.name, site.urls.at(0)||'MISSING', createDate, site.cron, site.lastResult)
}

@Injectable({ providedIn: 'root'})
export class BackendService implements BackendServiceType {
    status = false

    renewStatus() {
        console.log(`renewing status ${this.status}`)
        const pr = this.apiService.pingResponse()
        try {
            pr.subscribe((response) => {
                this.status = response.status < 400
            })
        }
        catch {
            this.status = false
        }
        setTimeout(() => {
            this.renewStatus()
        }, 1000);
    }
    
    constructor(private apiService: ApiService, private login: LoginService) {
        //throw Error('API Service is not implemented yet!')
        this.renewStatus()
    }

    async tryLogin(name: string, password: string):Promise<User|undefined> {
        throw Error('API Service is not implemented yet!')
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