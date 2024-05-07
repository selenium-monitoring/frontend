import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from '../login/user.model';
import { Router } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  user?: User;

  constructor(private loginService: LoginService, private router: Router, private breadcrumb: BreadcrumbService) {
    this.user = loginService.getUser;
  }
}
