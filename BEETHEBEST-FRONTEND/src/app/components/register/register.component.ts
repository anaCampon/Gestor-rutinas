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
    console.log('submit', this.form.value);
    console.log('isValid', this.form.valid);
    const nuevoUsuario = this.usuarioService.createUser(
      this.form.value.username!,
      this.form.value.email!,
      this.form.value.password!,
    );
    if(nuevoUsuario) {
      alert('Usuario registrado con éxito');
      this.router.navigate(['/login']);
    }
  }
}
