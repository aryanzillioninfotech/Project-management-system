import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Users</h3>
    <ul class="list-group">
      <li *ngFor="let u of users" class="list-group-item d-flex justify-content-between">
        <div>{{u.name}} <small class="text-muted">{{u.email}}</small></div>
        <div><button class="btn btn-sm btn-danger" (click)="delete(u.id)">Delete</button></div>
      </li>
    </ul>
    <div class="mt-3">
      <button class="btn btn-success" (click)="create()">Add Random User</button>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }
  load() { this.api.get('users').subscribe((r:any)=> this.users = r); }
  delete(id:number) { if(confirm('Delete user?')) this.api.delete(`users/${id}`).subscribe(()=>this.load()); }
  create() { const name = 'User'+Math.floor(Math.random()*1000); this.api.post('users',{name, email: `${name}@example.com`, password: '1234'}).subscribe(()=>this.load()); }
}
