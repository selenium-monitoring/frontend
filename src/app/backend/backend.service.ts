import { Injectable } from "@angular/core";
import { ApiModule } from "./api/api.module";
import { Site } from "../site/site.model";
import { User } from "../login/user.model";
import { LoginService } from "../login/login.service";
import { CronFormEventType } from "../uploader/cronform.model";
import { SideFileType } from "../uploader/side.model";
import { BackendServiceType } from "./backend.model";
import { ApiService } from "./api/services";
import { Observable } from "rxjs";
import { sites } from "../site-list/mock-sites";

@Injectable({ providedIn: 'root'})
export class BackendService implements BackendServiceType {

    constructor(private apiService: ApiService, private login: LoginService) {
        //throw Error('API Service is not implemented yet!')
    }

    async tryLogin(name: string, password: string):Promise<User|undefined> {
        throw Error('API Service is not implemented yet!')
    }

    async getSites(): Promise<Site[]> {
        const ret:Site[] = []
        this.apiService.SiteList().forEach((value) => {
            value.sites?.forEach(site => {
                const createDate = new Date(site.dateAdded)
                ret.push(new Site(site.name, site.urls[0], createDate, site.cron, site.lastResult))
            })
        })
        return ret
    }
    async getSiteDetail(name: string): Promise<Site|undefined> {
        throw Error('API Service is not implemented yet!')
    }

    async submitSite(info:CronFormEventType, fileData: SideFileType): Promise<boolean> {
        throw Error('API Service is not implemented yet!')
    }
}