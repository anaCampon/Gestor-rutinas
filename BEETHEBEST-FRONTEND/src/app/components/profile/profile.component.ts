import { Component, inject, OnInit } from '@angular/core';
import { Profile, UsuarioService } from '../../services/usuario.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  public username: String ='';
  public interests: String ='';
  public weekly_goals: String ='';
  public weekly_availability: String ='';
  data: any;

  ngOnInit() {
    this.usuarioService.getUsers()
    .subscribe({next: (response) => {
      console.log('Datos del usuario:', response);
      console.log('Username:', response.data.username);
      this.username = response.data.username;
      this.interests = response.data.interests;
      this.weekly_goals = response.data.weekly_goals;
      this.weekly_availability = response.data.weekly_availability;
    },
    error: (err) => {
      console.error('Error al obtener el listado de usuarios:', err);
    }});
  }

  updateProfile () {
    this.router.navigate(['/profile/form']);
  }

  seeRoutines () {
    this.router.navigate(['/routine']);
  }

  goHome () {
    this.router.navigate(['/home']);
  }

}
