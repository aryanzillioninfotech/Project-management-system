import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>All Tasks</h3>
    <ul class="list-group" *ngIf="tasks.length > 0; else noData">
      <li *ngFor="let t of tasks" class="list-group-item d-flex justify-content-between">
        <div>{{ t.name }} <small class="text-muted">({{ t.state }})</small></div>
        <div>
          <button class="btn btn-sm btn-outline-primary" (click)="toggle(t)">Toggle</button>
        </div>
      </li>
    </ul>

    <ng-template #noData>
      <p class="text-danger">No Tasks Found</p>
    </ng-template>
  `
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.get('tasks').subscribe((r: any) => {
      console.log("Loaded Tasks:", r);
      this.tasks = r;
    });
  }

  toggle(t: any) {
    const next = t.state === 'todo'
      ? 'in-progress'
      : (t.state === 'in-progress' ? 'done' : 'todo');

    this.api.put(`tasks/${t.id}`, { ...t, state: next }).subscribe(() => this.load());
  }
}
