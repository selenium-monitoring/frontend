import { Injectable, isDevMode } from "@angular/core";
import { User } from "./user.model";

@Injectable({ providedIn: 'root'})
export class LoginService {
    private user?: User;
  
    constructor() {
      if(isDevMode()) this.user = new User('test_user', '', new Date())
    }
  
    get getUser() {
      return this.user;
    }

    async login(username: string, token: string, expires: Date) {
      this.user = new User(username, token, expires)
      return this.user
    }
    logout() {
      this.user = undefined;
    }
  }