import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data-model';
import { Subject } from 'rxjs';
// class to connect to the node backend for logging in & signing up
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private isAuthenticated = false;
  // listener for the jwt token if it exists or not
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) {}
  getToken() {
    // returning the value that came from login method
    return this.token;
  }

  // method for retriving authorization status. authorization status is set permenatley no next update
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  createUser(email: string, password: string) {
    // sending http post request to post new user
    // tslint:disable-next-line:object-literal-shorthand
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(response => {
      console.log(response);
  });
}
// http postt method for login
login(email: string, password: string) {
  // tslint:disable-next-line:object-literal-shorthand
  const authData: AuthData = {email: email, password: password};
  this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
  // extracting the token from the post
  .subscribe(response => {
    const token = response.token;
    this.token = token;
    if (token) {
      this.isAuthenticated = true;
    // aftering succesful login have authStatusListener set to true
      this.authStatusListener.next(true);
    }
});
}
  logout() {
    // clear token value by setting it to null. seeting authentication to false
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
  }
}
