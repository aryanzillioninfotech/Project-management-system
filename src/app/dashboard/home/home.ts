import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Dashboard</h2>
    <div class="row">
      <div class="col-md-4"><div class="card p-3">Projects: {{projects}}</div></div>
      <div class="col-md-4"><div class="card p-3">Tasks: {{tasks}}</div></div>
      <div class="col-md-4"><div class="card p-3">Users: {{users}}</div></div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  projects = 0; tasks = 0; users = 0;
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.api.get<any[]>('projects').subscribe(res => this.projects = res.length);
    this.api.get<any[]>('tasks').subscribe(res => this.tasks = res.length);
    this.api.get<any[]>('users').subscribe(res => this.users = res.length);
  }

}
