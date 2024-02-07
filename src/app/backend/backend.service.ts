import { Injectable } from "@angular/core";
import { ApiModule } from "../services";
import { environment } from "src/environments/environment";
import { sites } from "../site-list/mock-sites";
import { Site } from "../site/site.model";
import { User } from "../login/user.model";
import { LoginService } from "../login/login.service";
import { CronFormEventType } from "../uploader/cronform.model";
import { SideFileType } from "../uploader/side.model";
import { BackendServiceType } from "./backend.model";

@Injectable({ providedIn: 'root'})
export class BackendService implements BackendServiceType {

    constructor(private apiService: ApiModule, private login: LoginService) {
        throw Error('API Service is not implemented yet!')
    }

    async tryLogin(name: string, password: string):Promise<User|undefined> {
        throw Error('API Service is not implemented yet!')
    }

    async getSites(): Promise<Site[]> {
        throw Error('API Service is not implemented yet!')
    }
    async getSiteDetail(name: string): Promise<Site|undefined> {
        throw Error('API Service is not implemented yet!')
    }

    async submitSite(info:CronFormEventType, fileData: SideFileType): Promise<boolean> {
        throw Error('API Service is not implemented yet!')
    }
}