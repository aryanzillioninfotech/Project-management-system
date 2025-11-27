import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h3>Projects</h3>
      <button (click)="create()" class="btn btn-sm btn-primary">New</button>
    </div>

    <ul class="list-group">
      <li *ngFor="let p of projects" class="list-group-item d-flex justify-content-between">
        <div>
          <strong>{{p.title}}</strong>
          <div class="text-muted">{{p.description}}</div>
        </div>
        <div>
          <button class="btn btn-sm btn-outline-primary me-2" (click)="open(p.id)">Open</button>
          <button class="btn btn-sm btn-danger" (click)="delete(p.id)">Delete</button>
        </div>
      </li>
    </ul>
  `
})
export class ProjectListComponent implements OnInit {
  projects: any[] = [];
  constructor(private api: ApiService, private router: Router) {}
  ngOnInit() { this.load(); }
  load() { this.api.get('projects').subscribe((r:any)=> this.projects = r); }
  open(id: number) { this.router.navigate(['/projects', id]); }
  create() {
    const title = prompt('Project title') || 'Untitled';
    this.api.post('projects', { title, description: '', ownerId: 1 }).subscribe(()=>this.load());
  }
  delete(id:number) { if(confirm('Delete?')) this.api.delete(`projects/${id}`).subscribe(()=>this.load()); }
}
