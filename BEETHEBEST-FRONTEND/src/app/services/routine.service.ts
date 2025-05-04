import { inject, Injectable } from '@angular/core';
import { AuthTokenService } from './auth-token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {
  authTokenService = inject(AuthTokenService);
  http = inject(HttpClient);
  API_URL= environment.API_URL;
  //creo variable de tipo USER que indico abajo su estructura
  routine: Routine[] = [];

  //Devuelve los datos de las rutinas
  seeRoutine(): Observable<Routine> {
    //Primero añado el token para poder visualizar los datos
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Routine>(
      `${this.API_URL}/routine`, {headers});
  }

  createRoutine(data:string): Observable<any>{
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Rutina a enviar:', data);
    return this.http.post(
      `${this.API_URL}/routine/generate`, data, {headers});
  }

  addTask(task: any): Observable<any> {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(
      `${this.API_URL}/routine/generate/task`, task, {headers});
  }

  updateTask(id: number, updatedTask: any): Observable<any> {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(
      `${this.API_URL}/routine/${id}`, updatedTask, {headers}
    );
  }

  deleteTask(id: number): Observable<any> {
    const token = this.authTokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(
      `${this.API_URL}/routine/${id}`, {headers}
    );
  }
  
  
}

export type Routine = {
  data: any;
  name: string;
  week: string;
  tasks: Task[]
}

export type Task = {
  taskName: string;
  weekDay: string;
  initTime: string;
  endTime: string;
  Description:string;
}
