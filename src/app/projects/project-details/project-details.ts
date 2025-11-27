import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="project">
      <h3>{{project.title}}</h3>
      <p>{{project.description}}</p>

      <h5>Tasks</h5>
      <ul class="list-group mb-3">
        <li *ngFor="let t of tasks" class="list-group-item d-flex justify-content-between">
          <div>{{t.title}} <small class="text-muted">({{t.status}})</small></div>
          <div>
            <button class="btn btn-sm btn-outline-success" (click)="toggleStatus(t)">Toggle</button>
            <button class="btn btn-sm btn-danger" (click)="deleteTask(t.id)">Delete</button>
          </div>
        </li>
      </ul>

      <div class="input-group">
        <input #txt class="form-control" placeholder="New task title" />
        <button class="btn btn-primary" (click)="addTask(txt.value); txt.value=''">Add</button>
      </div>
    </div>
  `
})
export class ProjectDetailsComponent implements OnInit {
  project: any; tasks: any[] = [];
  constructor(private route: ActivatedRoute, private api: ApiService) {}
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.api.get(`projects/${id}`).subscribe(p => this.project = p);
    this.loadTasks(id);
  }
  loadTasks(projectId:number) {
    this.api.get('tasks', { projectId }).subscribe((r: any) => this.tasks = r);
  }
  addTask(title: string) {
    if(!title) return;
    this.api.post('tasks', { title, projectId: this.project.id, status: 'todo' }).subscribe(()=>this.loadTasks(this.project.id));
  }
  toggleStatus(task:any) {
    const next = task.status === 'todo' ? 'in-progress' : (task.status === 'in-progress' ? 'done' : 'todo');
    this.api.put(`tasks/${task.id}`, { ...task, status: next }).subscribe(()=>this.loadTasks(this.project.id));
  }
  deleteTask(id:number) { this.api.delete(`tasks/${id}`).subscribe(()=>this.loadTasks(this.project.id)); }
}
