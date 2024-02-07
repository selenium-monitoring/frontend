import { Component } from '@angular/core';
import { ApiModule } from './services';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';
import { User } from './login/user.model';
import { Router } from '@angular/router';
import { BreadcrumbInfo, BreadcrumbService } from './main/breadcrumb.service';
import { environment } from 'src/environments/environment';
import { BackendService } from './backend/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [{provide: BackendService, useClass: BackendService}],
})
export class AppComponent {
  title = 'Selenium Monitoring';
  token = null;
  isCollapsed = true
  
  constructor(private backendService: BackendService, private loginService: LoginService, private router: Router, public breadcrumbs: BreadcrumbService) {
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
