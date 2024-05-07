import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Site } from '../site/site.model';
import { NzTableSortOrder, NzTableSortFn } from 'ng-zorro-antd/table';
import { sites } from './mock-sites';
import { BackendService } from '../backend/backend.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss'],
  providers: [{provide: BackendService, useClass: BackendService}],
})
export class SiteListComponent {
  allSites?: Site[];
  shownSites?: Site[];
  visible=false
  searchValue = ''
  sortOrder: NzTableSortOrder = null;
  sortByName:NzTableSortFn<Site> = (a:Site,b:Site) => a.name.localeCompare(b.name, undefined, {numeric:true});
  resultFilterFunc = (list: string[], item: Site) => {
    return list.some(name => item.lastResult === name)
  }
  resultFilters = [
    { text: "Success", value: "Success"},
    { text: "Error", value: "Error"},
    { text: "Running", value: "Running"},
    { text: "Unknown", value: "Unknown"},
  ]

  constructor(private router: Router, private backend: BackendService, private msg: NzMessageService ) {
    backend.getSites().then((sites) => {
      this.allSites = sites
      this.shownSites = [...this.allSites]
    }).catch(err => {
      this.msg.error(err['message'])
      this.allSites = this.shownSites = []
    })
  }

  search() {
    this.visible = false
    this.shownSites = this.allSites?.filter(
      (item: Site) => item.name.toLocaleLowerCase().indexOf(this.searchValue.toLocaleLowerCase()) !== -1
    )
  }
  reset() {
    this.searchValue = ''
    this.search()
  }
}
