import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  { path: 'auth', children: [
      { path: 'login'  , loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.RegisterComponent) }
    ]
  },

  { path: 'dashboard',canActivate: [authGuard], loadComponent: () => import('./dashboard/home/home').then(m => m.HomeComponent) },

  { path: 'projects', children: [
      { path: '' , canActivate: [authGuard], loadComponent: () => import('./projects/project-list/project-list').then(m => m.ProjectListComponent) },
    ]
  },

  { path: 'tasks',  canActivate: [authGuard], loadComponent: () => import('./tasks/task-list/task-list').then(m => m.TaskListComponent) },
  { path: 'users',  canActivate: [authGuard], loadComponent: () => import('./users/user-list/user-list').then(m => m.UserListComponent) },

  { path: '**', redirectTo: '' }
];
