import { AuthTokenService } from './../../services/auth-token.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authTokenService = inject(AuthTokenService);
  router = inject(Router);
  //Doy estilo al formulario
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  submit(): void {
    this.form.markAllAsTouched();

    if(this.form.invalid){
      alert('Por favor rellena todos los campos');
      return;

    }

    const username = this.form.value.username!;
    const password = this.form.value.password!;

    this.authTokenService.setToken(
      this.form.controls['username'].value!,
      this.form.controls['password'].value!
    );
    this.router.navigate(['/profile']);
    
  }

}
