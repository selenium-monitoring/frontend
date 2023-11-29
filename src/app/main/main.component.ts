import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from '../login/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  user?: User;

  constructor(private loginService: LoginService, private router: Router) {
    this.user = loginService.getUser;
  }
}
