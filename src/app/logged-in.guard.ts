import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login/login.service';

export const loggedInGuard: CanActivateFn = (route, state) => {
  return inject(LoginService).getUser?.isLoggedIn || false
};
