import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  nombreToken: string = 'token';

  getToken(): string | null {
    return sessionStorage.getItem(this.nombreToken);
  }

  setToken(nombreUsuario: string, contrasena: string): void {
    const token = nombreUsuario + contrasena;
    sessionStorage.setItem(this.nombreToken, token);
  }
}
