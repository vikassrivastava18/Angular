import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'auth_token';

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  login(token: string): void {
    localStorage.setItem(this.storageKey, token);
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }
}
