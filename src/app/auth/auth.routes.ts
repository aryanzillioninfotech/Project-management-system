import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
// import { Login } from './login/login';
// import { Register } from './register/register';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';

export default [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
] as Routes;
