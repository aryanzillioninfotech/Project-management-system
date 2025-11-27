import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../shared/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
    api = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<{ token: string, user: User } | null> {
        const params = new HttpParams().set('email', email).set('password', password);
        return this.http.get<User[]>(`${this.api}/users`, { params }).pipe(
            map(users => {
                if (users.length) {
                    const user = users[0];
                    const token = btoa(JSON.stringify({ id: user.id, email: user.email, role: user.role })); // fake token
                    localStorage.setItem('token', token);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return { token, user };
                } else return null;
            })
        );
    }

    register(payload: Partial<User>) {
        return this.http.post<User>(`${this.api}/users`, payload);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
    }


    getToken(): string | null { return localStorage.getItem('token'); }
    isLoggedIn(): boolean { return !!this.getToken(); }
    currentUser(): User | null { return JSON.parse(localStorage.getItem('currentUser') || 'null'); }
}
