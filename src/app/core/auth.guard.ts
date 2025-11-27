import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');  // check login status

  if (token) {
    return true;    // allow
  } else {
    router.navigate(['/auth/login']);   // redirect to login
    return false;
  }
};
