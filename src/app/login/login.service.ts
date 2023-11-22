import { Injectable } from "@angular/core";
import { User } from "./user.model";

@Injectable({ providedIn: 'root'})
export class LoginService {
    private user?: User;
  
    constructor() {
    }
  
    get getUser() {
      return this.user;
    }

    login(username: string, password: string) {
        this.user = new User(username, password, new Date())
    }
  }