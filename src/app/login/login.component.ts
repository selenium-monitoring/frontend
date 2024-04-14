import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { User } from './user.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { BackendService } from '../backend/backend.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [{provide: BackendService, useClass: BackendService}],
})
export class LoginComponent {
  pageName = 'Login'
  remember = false
  isInvalidLogin = false
  loggingIn = false

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [true, []]
  });

  submitForm(): void {
    this.loggingIn = true
    if (this.validateForm.valid) {
      const {userName, password, remember} = this.validateForm.value
      
      if (userName === undefined || password === undefined) {return;}
        this.backend.tryLogin(userName, password, remember||false).then((user) => {
          if (user) {
            this.login.loginUser(user)
            this.router.navigateByUrl('/')
          }
          else {
            this.isInvalidLogin = true
            this.loggingIn = false
          }
        }).catch((error) => {
          this.isInvalidLogin = true
          this.loggingIn = false
        })
    } else {
      this.isInvalidLogin = false
      this.loggingIn = false
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ssoLogin() {
    this.oidcSecurityService.authorize()
  }

  get serverStatusString() {
    switch (this.backend.status){
      case undefined: return "default"
      case true: return "success"
      case false: return "error"
    }
  }

  constructor(private fb: NonNullableFormBuilder,
              private login: LoginService,
              private router: Router,
              private backend: BackendService,
              private oidcSecurityService: OidcSecurityService) {
    if (login.getUser) {
      router.navigateByUrl('/')
    }
  }
}
