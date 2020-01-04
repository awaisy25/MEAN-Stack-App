import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
  // injecting auth service
@Injectable()
// class to guard against route like create post for unauthorized users
export class AuthGuards implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  // can activate checks if route exists and its state. returns either a boolean, observable or promise
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |
  Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    // based on authorization value from auth services return true or redirects back to login page
    if (!isAuth) {
      this.router.navigate(['/auth/login']);
    }
    return true;
  }
}
