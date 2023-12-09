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
    private breadcrumbs:string[] = []
    private base = {name: 'Home', url:'/'}
    private moreCrumbs?:BreadcrumbInfo[]
    constructor(private router:Router) {
        this.breadcrumbs.push('Home')
        this.router.events.pipe(filter(event=>event instanceof NavigationEnd)).subscribe((event) => {
            this.moreCrumbs = this.router.lastSuccessfulNavigation?.finalUrl?.root.children['primary']
                                ?.segments.map(item => new BreadcrumbInfo(item.path, item.path))
        })
    }
    urlFromSegments(segments: BreadcrumbInfo[], index: number): string[]|undefined {
        console.log('getting url')
        const url = segments.slice(0, index).map(item => item.url)
        console.log(url)
        if (url.every(item => item !== undefined)) {
            return undefined
        }
        // the if statement ensures type safety
        return url as string[]
    }
    get breadcrumbList() : BreadcrumbInfo[] {
        if (this.moreCrumbs) return [this.base, ...this.moreCrumbs]
        return [this.base]
    }
}