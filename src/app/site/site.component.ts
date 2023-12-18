import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from './result.model';
import { Site } from './site.model';

// mocked data until backend is implemented
import { sites } from '../site-list/mock-sites';
import { results } from './mocked-results';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent {
  site:Site
  results:Result[];
  constructor(private router: ActivatedRoute) {
    
    this.site = sites[router.snapshot.params['id']]
    this.results = results
  }
}
