import { AuthTokenService } from './auth-token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  authTokenService = inject(AuthTokenService);
  http = inject(HttpClient);
  API_URL= environment.API_URL;
  //creo variable de tipo USER que indico abajo su estructura
  users: User[] = [];

  createUser(username: string, email: string, password: string) {
    return this.http.post<User>(
      `${this.API_URL}/users/register`,
      {username, email, password}
    );
  }

  //Devuelve los datos del usuario logeado
  getUsers(): Observable<Profile> {
    //Primero añado el token para poder visualizar los datos
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Profile>(
      `${this.API_URL}/profile`, {headers});
  }
  
  updateUser(interests: string, weekly_goals: string, weekly_availability: string) {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Profile>(`${this.API_URL}/profile/form`, {interests, weekly_goals, weekly_availability}, {headers});
  }
}

export type User = {
  username: string;
  email: string;
  password: string;
}

export type Profile = {
  data: any;
  username: string;
  interests: string;
  weekly_goals: string;
  weekly_availability: string;
}