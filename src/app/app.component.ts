import { Component } from '@angular/core';
import { ApiModule } from './services';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';
import { User } from './login/user.model';
import { Router } from '@angular/router';
import { BreadcrumbInfo, BreadcrumbService } from './main/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'selenium-monitoring';
  token = null;
  isCollapsed = true
  
  constructor(private apiService: ApiModule, private loginService: LoginService, private router: Router, public breadcrumbs: BreadcrumbService) {
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
