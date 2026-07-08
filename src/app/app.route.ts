import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Todo } from './todo/todo';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'todos',
    component: Todo,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'todos'
  }

];