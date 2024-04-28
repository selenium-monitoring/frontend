import { Injectable, isDevMode } from "@angular/core";
import { User } from "./user.model";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root'})
export class LoginService {
    private user?: User;
  
    constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {
      // if(isDevMode()) this.user = new User('test_user', '', new Date())
      const userName = localStorage.getItem('Username')
      if (userName !== null) {
        const expiry = localStorage.getItem('Expiry')!
        this.user = new User(userName, new Date(expiry))
        router.navigateByUrl('/')
      }
      this.oidcSecurityService
        .checkAuth()
        .subscribe((data) => {
          const { isAuthenticated, accessToken, userData, idToken } = data
          if (isAuthenticated) {
            console.log(data)
            localStorage.setItem('Username', userData.name)
            localStorage.setItem('Expiry', userData.exp)
            this.user = new User(userData.name, new Date(userData.exp), accessToken)
            router.navigateByUrl('/')
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