import { User } from "../login/user.model";
import { Site } from "../site/site.model";
import { CronFormEventType } from "../uploader/cronform.model";
import { SideFileType } from "../uploader/side.model";

export interface BackendServiceType {
    get status(): boolean
    // Auth
    tryLogin(name: string, password: string): Promise<User|undefined>

    // Get
    getSites(): Promise<Site[]>
    getSiteDetail(name: string): Promise<Site|undefined>
    
    // Post
    submitSite(info:CronFormEventType, fileData: SideFileType):Promise<boolean>
}
