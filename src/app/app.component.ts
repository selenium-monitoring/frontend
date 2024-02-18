import { Component } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from './main/breadcrumb.service';
import { BackendService } from './backend/backend.service';
import { NzMenuThemeType } from 'ng-zorro-antd/menu';
import { appTitleStrategy } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{provide: BackendService, useClass: BackendService}],
})
export class AppComponent {
  title = 'Selenium Monitoring';
  token = null;
  isCollapsed = true;
  theme:NzMenuThemeType = "dark";
  
  constructor(
    private loginService: LoginService,
    private router: Router,
    public breadcrumbs: BreadcrumbService,
    public titleService: appTitleStrategy,
    ) {
      titleService.getTitleEvent.subscribe((newTitle) => this.title = newTitle)
  }
  
  get getUser() {
    return this.loginService.getUser
  }
  logoutUser() {
    this.loginService.logout()
    this.router.navigateByUrl('login')
  }

  // fetchData(): Observable<any> {
  //   return this.apiService.;
  // }
}
