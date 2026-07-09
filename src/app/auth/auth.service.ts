import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isLoggedIn = signal(!!localStorage.getItem('token'));

    private http = inject(HttpClient);

    private api = 'http://127.0.0.1:8000/auth';

    login(data: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${this.api}/login`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).pipe(
            tap(response => {
                console.log(response);   // Check this
                localStorage.setItem('token', response.token);
                this.isLoggedIn.set(true)
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        this.isLoggedIn.set(false)
    }

    isAuthenticated(): boolean {
        return this.isLoggedIn();
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

}