import { Injectable, isDevMode } from "@angular/core";
import { User } from "./user.model";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root'})
export class LoginService {
    private user?: User;
  
    constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {
      // if(isDevMode()) this.user = new User('test_user', '', new Date())
      this.oidcSecurityService
        .checkAuth()
        .subscribe((data) => {
          console.log('logged in', data)
          const { isAuthenticated, accessToken, userData, idToken } = data
          if (isAuthenticated) {
            this.user = new User(userData.name, accessToken, new Date(userData.exp))
            router.navigateByUrl('/home');
          }
      });
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
      this.oidcSecurityService
        .logoff()
        .subscribe((result) => console.log(result));
      this.oidcSecurityService.logoffLocal();

    }
  }