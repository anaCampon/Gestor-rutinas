import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RoutineComponent } from './components/routine/routine.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { authTokenGuard } from './guards/auth-token.guard';
import { GenerateRoutineComponent } from './components/generate-routine/generate-routine.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path:'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [authTokenGuard]},
    {path: 'profile/form', component: EditProfileComponent, canActivate: [authTokenGuard]},
    {path: 'routine', component: RoutineComponent, canActivate: [authTokenGuard]},
    {path: 'routine/generate', component: GenerateRoutineComponent, canActivate: [authTokenGuard]}
];
