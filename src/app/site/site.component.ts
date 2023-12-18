import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from './site.model';

// mocked data until backend is implemented
import { sites } from '../site-list/mock-sites';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent {
  site?:Site
  siteName:string
  constructor(private router: ActivatedRoute) {
    this.siteName = router.snapshot.params['name']
    const site = sites.find((data) => {return data.name == this.siteName})
    this.site =  site
  }
}
