import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
// intercepting the auth service token to post service class
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  // takes in req through HTTP request and sends it using next
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // retrieving the token from authservice.ts
    const authToken = this.authService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    }); // creates copy of http request & I edited the header to get the token header
    return next.handle(authRequest);

  }
}
