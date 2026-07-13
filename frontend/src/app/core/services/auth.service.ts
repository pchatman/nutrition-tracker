import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http   = inject(HttpClient);
  private router = inject(Router);
  private url    = `${environment.apiUrl}/auth`;

  currentUser$ = new BehaviorSubject<string | null>(
    localStorage.getItem('username')
  );

  login(req: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.url}/login`, req).pipe(
      tap(res => this.saveSession(res))
    );
  }

  register(req: RegisterRequest) {
    return this.http.post<AuthResponse>(`${this.url}/register`, req).pipe(
      tap(res => this.saveSession(res))
    );
  }

  logout() {
    localStorage.clear();
    this.currentUser$.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken()     { return localStorage.getItem('token'); }
  isLoggedIn()   { return !!this.getToken(); }

  private saveSession(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('username', res.username);
    this.currentUser$.next(res.username);
  }
}
