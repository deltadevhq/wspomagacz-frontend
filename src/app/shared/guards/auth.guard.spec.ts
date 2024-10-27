import { TestBed } from '@angular/core/testing';
import { isAuthenticatedGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('isAuthenticatedGuard', () => {
  const executeGuard = (...guardParameters: [ActivatedRouteSnapshot, RouterStateSnapshot]) => TestBed.runInInjectionContext(() =>
    isAuthenticatedGuard(...guardParameters),
  );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
