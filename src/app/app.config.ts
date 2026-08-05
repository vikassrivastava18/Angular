import { ApplicationConfig } from '@angular/core';
import { HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideRouter } from '@angular/router';
import { routes } from './app.route';

import { authInterceptor } from './auth/auth.interceptor';


export const apiBaseUrl = 'http://127.0.0.1:8000';

const apiRouteInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('http')) {
    return next(req);
  }

  const normalizedUrl = req.url.replace(/^\/+/, '');
  const apiReq = req.clone({
    url: `${apiBaseUrl}/${normalizedUrl}`
  });

  return next(apiReq);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        apiRouteInterceptor,
        authInterceptor
      ])
    )
  ]
};