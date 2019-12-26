import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data-model';
// class to connect to the node backend for logging in & signing up
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  createUser(email: string, password: string) {
    // sending http post request to post new user
    // tslint:disable-next-line:object-literal-shorthand
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(response => {
      console.log(response);
  });
}
}
