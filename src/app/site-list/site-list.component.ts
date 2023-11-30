import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Site } from '../site/site.model';
import { NzTableSortOrder } from 'ng-zorro-antd/table';

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
    this.sites = [
      new Site(0, 'http://localhost/', new Date(), 3, "Success"),
      new Site(1, 'http://example.com/', new Date(), 5, "Error"),
      new Site(2, 'http://127.0.0.1/', new Date(), 1, "Success"),
      new Site(3, 'http://localhost/', new Date(), 3, "Running"),
      new Site(4, 'http://example.com/', new Date(), 5, "Error"),
      new Site(5, 'http://127.0.0.1/', new Date(), 1, "Success"),
      new Site(6, 'http://localhost/', new Date(), 3, "Success"),
      new Site(7, 'http://example.com/', new Date(), 5, "Error"),
      new Site(8, 'http://127.0.0.1/', new Date(), 1, "Success"),
      new Site(9, 'http://localhost/', new Date(), 3, "Success"),
      new Site(10, 'http://example.com/', new Date(), 5, "Error"),
      new Site(11, 'http://127.0.0.1/', new Date(), 1, "Success"),
    ]
  }
}
