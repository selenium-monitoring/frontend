import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from './site.model';

import { BackendService } from '../backend/backend.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  providers: [{provide: BackendService, useClass: BackendService}],
})
export class SiteComponent {
  site?:Site
  siteName?:string
  isLoading = true
  isVisible = false

  constructor(private route: ActivatedRoute, private backend: BackendService, private msg: NzMessageService, private router: Router ) {
    this.siteName = route.snapshot.paramMap.get('name') || ''
    backend.getSiteDetail(this.siteName).then((site) => {
      if (site === undefined) return
      this.site =  site
    }).catch((err) => {
      if(err['status'] != 404) {
        this.msg.error(err['message'])
      }
    }).finally(() => this.isLoading = false);
    
  }

  async handleDelete() {
    const success = await this.backend.deleteSite(this.siteName!)
    if (!success) {
      this.msg.error('Failed to delete site')
      return
    }
    this.router.navigateByUrl("/sites")
    this.msg.error(`Deleted site "${this.siteName}"`)
  }
}
