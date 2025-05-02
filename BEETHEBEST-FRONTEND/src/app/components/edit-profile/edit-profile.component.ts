import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from './../../services/usuario.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {

  usuarioService = inject(UsuarioService);
  router = inject(Router);

  form = new FormGroup({
    interests: new FormControl('', Validators.required),
    weeklyGoals: new FormControl('', Validators.required),
    weeklyAvailability: new FormControl('', Validators.required)
  });

  public interests: String ='';
  public weekly_goals: String ='';
  public weekly_availability: String ='';

  ngOnInit(): void {
    // Para dejar por defecto lso datos del usuario
    this.usuarioService.getUsers()
    .subscribe({next: (response) => {
      this.interests = response.data.interests;
      this.weekly_goals = response.data.weekly_goals;
      this.weekly_availability = response.data.weekly_availability;
    }});
  }

  onSubmit():void {
    if (this.form.invalid){
      alert('Rellena todos los campos')
      return;
    }
    const interests = this.form.value.interests!;
    const weekly_goals = this.form.value.weeklyGoals!;
    const weekly_availability = this.form.value.weeklyAvailability!;
    
    //Llamo al servicio users para actualizar el usuario

    this.usuarioService.updateUser(interests, weekly_goals, weekly_availability)
    .subscribe({
      next: (response) => {
        console.log('Usuario actualizado:', response);
        alert('Usuario actualizado con éxito');
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('Error al actualizar el usuario');
      }
    });
  }

  goBack () {
    this.router.navigate(['/profile']);
  }

}
