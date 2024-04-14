import { Injectable } from "@angular/core";
import { sites } from "../site-list/mock-sites";
import { Site } from "../site/site.model";
import { User } from "../login/user.model";
import { LoginService } from "../login/login.service";
import { CronFormEventType } from "../uploader/cronform.model";
import { SideFileType } from "../uploader/side.model";
import { BackendServiceType } from "./backend.model";

@Injectable({ providedIn: 'root'})
export class BackendService implements BackendServiceType {
    // for spinner demonstration purposes
    private async delay() {await new Promise(res => setTimeout(res, 1000))}

    get status() {return true}
    constructor(private login: LoginService) {
    }

    async tryLogin(name: string, password: string, shouldRemember: boolean):Promise<User|undefined> {
        await this.delay()
        if (name !== password) return undefined
        return await this.login.login(name, password, new Date())
    }

    async getSites(): Promise<Site[]> {
        await this.delay()
        return sites
    }
    async getSiteDetail(name: string): Promise<Site|undefined> {
        await this.delay()
        return sites.find((value) => value.name === name)
    }

    async submitSite(info:CronFormEventType, fileData: SideFileType) {
        await this.delay()
        const site = new Site(
            info.name,
            fileData.url,
            new Date(),
            info.cron,
            'Unknown',
        )
        if (sites.some(item=>item.name === site.name)) {
            throw Error(`Name "${site.name}" already exists!`)
        }
        sites.push(site)

        return true
    }
}