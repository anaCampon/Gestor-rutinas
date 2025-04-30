import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  users: User[] = [];

  createUser(
    username: string,
    email: string,
    password: string
  ) : User {

    const user: User = {
      username: username,
      email: email,
      password: password
    }
    return user;
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
