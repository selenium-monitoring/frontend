import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { OidcSecurityService, PublicEventsService } from "angular-auth-oidc-client";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root'})
export class LoginService {
    private user?: User;
    constructor(private oidcSecurityService: OidcSecurityService, private router: Router, private oidcEvents: PublicEventsService) {
      // if(isDevMode()) this.user = new User('test_user', '', new Date())
      const userName = localStorage.getItem('Username')
      if (userName !== null) {
        const expiry = localStorage.getItem('Expiry')!
        this.user = new User(userName, new Date(expiry))
      }
      this.oidcSecurityService
        .checkAuth()
        .subscribe((data) => {
          const { isAuthenticated, accessToken, userData } = data
          if (isAuthenticated) {
            localStorage.setItem('Username', userData.name)
            localStorage.setItem('Expiry', userData.exp)
            this.loginUser(new User(userData.name, new Date(userData.exp), accessToken))
          }
        });
    }
  
    get getUser() {
      return this.user;
    }

    async login(username: string, token: string, expires: Date) {
      this.user = new User(username, expires)
      return this.user
    }
    async loginUser(user: User) {
      this.user = user
      return this.user
    }
    logout() {
      localStorage.removeItem('Username')
      localStorage.removeItem('Expiry')
      this.user = undefined;
      this.oidcSecurityService
        .logoff()
      this.oidcSecurityService.logoffLocal();

    }
  }