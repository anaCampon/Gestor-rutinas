import { AuthTokenService } from './../../services/auth-token.service';
import { routes } from './../../app.routes';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usuarioService = inject(UsuarioService);
  router = inject(Router);

  form = new FormGroup({
    username: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  });

  submit(): void {
    this.form.markAllAsTouched();
    if(this.form.invalid) {
      alert('Algún dato no está bien')
      return;
    }
    const username = this.form.value.username!;
    const email = this.form.value.email!;
    const password = this.form.value.password!;
    
    //Llamo al servicio users para crear el usuario
    const nuevoUsuario = this.usuarioService.createUser(username, email, password)
    .subscribe({
      next: (response) => {
        console.log('Usuario creado:', response);
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Error al registrar el usuario');
      }
    });
  }
}
