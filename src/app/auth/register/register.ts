import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3>Register</h3>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <input class="form-control mb-2" placeholder="Name" formControlName="name">
        <input class="form-control mb-2" placeholder="Email" formControlName="email">
        <input class="form-control mb-2" placeholder="Password" type="password" formControlName="password">
        <button class="btn btn-success w-100" type="submit">Register</button>
      </form>
    </div>
  </div>
  `
})
export class RegisterComponent {
  form!: FormGroup;
  // form = this.fb.group({ name: '', email: '', password: '' });
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    this.auth.register(this.form.value).subscribe(res => {
      alert('Registered. Please login.');
      this.router.navigate(['/auth/login']);
    });
  }
}
