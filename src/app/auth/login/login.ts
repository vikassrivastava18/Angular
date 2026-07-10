import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  auth = inject(AuthService);
  router = inject(Router);

  login() {

    this.auth.login({
      username: this.username,
      password: this.password
    }).subscribe({

      next: () => {
        this.router.navigate(['/todos']);
      },

      error: () => {
        alert("Invalid credentials");
      }

    });

  }

}