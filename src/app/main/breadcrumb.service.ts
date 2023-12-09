import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

export class BreadcrumbInfo {
    constructor(
        public name: string,
        public url?: string,
    ) {}
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
    private base:BreadcrumbInfo = {name: 'Home', url:'/'}
    private moreCrumbs?:BreadcrumbInfo[]
    constructor(private router:Router) {
        this.router.events.pipe(filter(event=>event instanceof NavigationEnd)).subscribe((event) => {
            this.moreCrumbs = this.router.lastSuccessfulNavigation?.finalUrl?.root.children['primary']
                                ?.segments.map(item => new BreadcrumbInfo(item.path, item.path))
        })
    }
    urlFromSegments(segments: BreadcrumbInfo[], index: number): string[]|undefined {
        const url = segments.slice(0, index+1).map(item => item.url)
        if (url.every(item => item !== undefined)) {
            // the if statement ensures type safety
            return url as string[]
        }
        return undefined
    }
    get breadcrumbList() : BreadcrumbInfo[] {
        if (this.moreCrumbs) return [this.base, ...this.moreCrumbs]
        return [this.base]
    }
}