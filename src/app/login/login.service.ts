import { Injectable } from "@angular/core";
import { User } from "./user.model";

@Injectable({ providedIn: 'root'})
export class LoginService {
    private user?: User;
  
    constructor() {
      this.user = new User('test_user', '', new Date())
    }
  
    get getUser() {
      return this.user;
    }

    login(username: string, password: string) {
        this.user = new User(username, password, new Date())
    }
    logout() {
      this.user = undefined;
    }
  }