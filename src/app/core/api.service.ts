import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
    api = 'http://localhost:3000';
    constructor(private http: HttpClient) { }
    get<T>(url: string, params?: any) {
        return this.http.get<T>(`${this.api}/${url}`, { params });
    }


    post<T>(endpoint: string, body: any) {
    return this.http.post<T>(`${this.api}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any) {
    return this.http.put<T>(`${this.api}/${endpoint}`, body);
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.api}/${endpoint}`);
  }
}
