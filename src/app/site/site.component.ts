import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from './site.model';

import { BackendService } from '../backend.service';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent {
  site?:Site
  siteName?:string
  isLoading = true


  constructor(private route: ActivatedRoute, private backend: BackendService) {
    this.siteName = route.snapshot.paramMap.get('name') || ''
    backend.getSiteDetail(this.siteName).then((site) => {
      this.isLoading = false
      if (site === undefined) return
      this.site =  site
    })
  }
}
