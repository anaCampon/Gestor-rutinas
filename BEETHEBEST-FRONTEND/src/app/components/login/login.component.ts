import { HttpClientModule } from '@angular/common/http';
import { AuthTokenService } from './../../services/auth-token.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule],
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
    if (this.form.invalid) {
      alert('Por favor rellena todos los campos');
      return;
    }
    // Uso ! porque sé que no es null ya que lo he validado antes.
    const username = this.form.value.username!;
    const password = this.form.value.password!;
    console.log('username:', username);
    console.log('password:', password);
    // Me suscribo a la función login del servicio para poder comprobar los datos
    // y si son correctos, guardo el token en el sessionStorage y redirijo a la página de perfil.
    this.authTokenService.login(username, password).subscribe({
      next: (response) => {
        this.authTokenService.setToken(response.token);
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      }
    })
     
  }

}

