import { TestBed } from '@angular/core/testing';

import { Auth } from './auth.service';

describe('Auth', () => {
  let service: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auth);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should track authentication state using local storage', () => {
    expect(service.isAuthenticated()).toBeFalsy();

    service.login('demo-token');
    expect(service.isAuthenticated()).toBeTruthy();

    service.logout();
    expect(service.isAuthenticated()).toBeFalsy();
  });
});
