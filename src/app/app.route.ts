import { Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { ToDo } from './todo/todo';
import { TopicComponent } from './topic/topic';
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
    component: ToDo,
    canActivate: [authGuard]
  },
  {
    path: 'topics',
    component: TopicComponent,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: 'todos'
  }

];