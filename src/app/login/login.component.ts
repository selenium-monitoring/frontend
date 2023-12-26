import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { User } from './user.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
      const {userName, password} = this.validateForm.value
      
      if (userName === undefined || password === undefined) {return;}
        this.backend.tryLogin(userName, password).then((value) => {
          if (value) {this.router.navigate(['/'])}
          else {
            this.isInvalidLogin = true
            this.loggingIn = false
          }
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

  constructor(private fb: NonNullableFormBuilder,
              private login: LoginService,
              private router: Router,
              private backend: BackendService) {
    if (login.getUser?.isLoggedIn) {
      router.navigateByUrl('')
    }
  }
}
