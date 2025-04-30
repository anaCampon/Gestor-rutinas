import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthTokenService } from '../services/auth-token.service';

export const authTokenGuard: CanActivateFn = (route, state) => {
  //Inyecto para poder redirigir a otras rutas
  const router = inject(Router);
  const authTokenService = inject(AuthTokenService);
  const token = authTokenService.getToken();
  if(token === null) {
    //Si no hay token, redirijo a HOME
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
