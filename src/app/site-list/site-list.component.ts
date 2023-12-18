import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Site } from '../site/site.model';
import { NzTableSortOrder } from 'ng-zorro-antd/table';
import { sites } from './mock-sites';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss']
})
export class SiteListComponent {
  sites: Site[];
  sortOrder: NzTableSortOrder = null;
  sortByTestCount = (a:Site,b:Site) => a.testCount-b.testCount;
  resultFilterFunc = (list: string[], item: Site) => list.some(name => item.lastResult === name)
  resultFilters = [
    { text: "Success", value: "Success"},
    { text: "Error", value: "Error"},
    { text: "Running", value: "Running"},
  ]

  constructor(private router: Router) {
    this.sites = sites
  }
}
