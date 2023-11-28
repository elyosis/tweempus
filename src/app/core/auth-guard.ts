import { inject } from "@angular/core";

import { Router, CanActivateFn } from "@angular/router";
import { AuthenticationService } from "./authentication.service";


export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  if(authService.checkLogin("1")) {
    return true;
  }

  return router.navigate(['/login']);
}