import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  auth = inject(AuthService)

  private router = inject(Router);

  logout(event: Event) {
    event.preventDefault();

    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
