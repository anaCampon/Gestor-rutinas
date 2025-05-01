import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

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

  public getUsers(): User[] {
    return this.users;
  }
  

}

export type User = {
  username: string;
  email: string;
  password: string;
}
