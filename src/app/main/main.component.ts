import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from '../login/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  user?: User;
  constructor(private service: LoginService) {
    this.user = service.getUser;
  }
}
