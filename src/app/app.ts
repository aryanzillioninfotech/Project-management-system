import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  template: `
   <div class="flex justify-content-center">
     <nav class="navbar navbar-expand navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" routerLink="/">PM System</a>
        <div class="navbar-nav">
          <a class="nav-link text-white" routerLink="/dashboard">Dashboard</a>
          <a class="nav-link text-white" routerLink="/projects">Projects</a>
          <a class="nav-link text-white" routerLink="/tasks">Tasks</a>
          <a class="nav-link text-white" routerLink="/users">Users</a>
        </div>
      </div>

      <!-- 🔥 LOGOUT BUTTON -->
      <button class="btn btn-danger" (click)="logout()">Logout</button>

    </nav>
   </div>

    <main class="container mt-4">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();           // remove token and user
    this.router.navigate(['/auth/login']); // redirect to login
  }
}
