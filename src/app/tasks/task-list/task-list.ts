import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>All Tasks</h3>
    <ul class="list-group">
      <li *ngFor="let t of tasks" class="list-group-item d-flex justify-content-between">
        <div>{{t.title}} <small class="text-muted">({{t.status}})</small></div>
        <div>
          <button class="btn btn-sm btn-outline-primary" (click)="toggle(t)">Toggle</button>
        </div>
      </li>
    </ul>
  `
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }
  load() { this.api.get('tasks').subscribe((r:any)=> this.tasks = r); }
  toggle(t:any) { const next = t.status === 'todo' ? 'in-progress' : (t.status === 'in-progress' ? 'done' : 'todo');
    this.api.put(`tasks/${t.id}`, {...t, status: next}).subscribe(()=>this.load());
  }
}
