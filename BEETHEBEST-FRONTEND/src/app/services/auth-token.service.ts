import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  API_URL= environment.API_URL;
  nombreToken: string = 'token';
  http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http.post<{token:string; usernameSelected:number}>(
      `${this.API_URL}/users/login`, {username, password});
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.nombreToken);
  }


}
