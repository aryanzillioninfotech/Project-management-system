import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3>Login</h3>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <input class="form-control mb-2" placeholder="Email" formControlName="email">
        <input class="form-control mb-2" type="password" placeholder="Password" formControlName="password">
        <button class="btn btn-primary w-100" type="submit">Login</button>
      </form>
      <div class="mt-2">
        <a routerLink="/auth/register">Register</a>
      </div>
    </div>
  </div>
  `
})
export class LoginComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  submit() {
    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe(res => {
      if (res) {
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid credentials');
      }
    }, err => alert('Error logging in'));
  }
}
