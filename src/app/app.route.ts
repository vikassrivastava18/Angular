import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { ToDo } from './todo/todo';
import { authGuard } from './auth/auth-guard';
import { List } from './todo/list/list';

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
    component: ToDo,
    canActivate: [authGuard]
  },
  {
    path: 'topics',
    component: List,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'todos'
  }

];