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
  constructor(private router: ActivatedRoute) {
    
    //this.site = sites[router.snapshot.params['name']]
    const site = sites.find((data) => {
      const name = router.snapshot.params['name']
      console.log(name, data.name)
      return data.name == name
    })
    this.site =  site
  }
}
