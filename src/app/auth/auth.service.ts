import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data-model';
import { Subject } from 'rxjs';
import { Route, Router } from '@angular/router';
// class to connect to the node backend for logging in & signing up
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private isAuthenticated = false;
  // listener for the jwt token if it exists or not
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}
  getToken() {
    // returning the value that came from login method
    return this.token;
  }

  // method for retriving authorization status. authorization status is set permenatley no next update
  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  createUser(email: string, password: string) {
    // sending http post request to post new user
    // tslint:disable-next-line:object-literal-shorthand
    const authData: AuthData = {email: email, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData).subscribe(() => {
      // tslint:disable-next-line:no-unused-expression
      this.router.navigate(['/']);
    }, error => {
      // if error produced authorization status will give false
      this.authStatusListener.next(false);
    });
}
// public shared method to authenticate the user & its token
autoAuthUser() {
  // retriving the objects from get auth data method
  const authInformation = this.getAuthData();
  if (!authInformation) {
    return;
  }
  const current = new Date();
  const expiresIn = authInformation.expirationDate.getTime() - current.getTime();
  // if token expiration value is higher than the current value
  // then user is still in session & authorized
  if (expiresIn > 0) {
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.userId = authInformation.userId;
    this.setAuthTimer(expiresIn / 1000); // sending it in seconds because setAuthTimer creates it in milliseconds
    this.authStatusListener.next(true);
  }
}
// http postt method for login
login(email: string, password: string) {
  // tslint:disable-next-line:object-literal-shorthand
  const authData: AuthData = {email: email, password: password};
  this.http.post<{token: string, expiresIn: number, userId: string}>('http://localhost:3000/api/user/login', authData)
  // extracting the token from the post
  .subscribe(response => {
    const token = response.token;
    this.token = token;
    if (token) {
      const expiresInDuration = response.expiresIn;
      this.setAuthTimer(expiresInDuration);
      this.isAuthenticated = true;
      this.userId = response.userId;
    // aftering succesful login have authStatusListener set to true
      this.authStatusListener.next(true);
      const currentDate = new Date(); // getting the current date for storing in local browser
      const expirationDate = new Date(currentDate.getTime() + (expiresInDuration * 1000));
      console.log(expirationDate);
      this.saveAuthData(token, expirationDate, this.userId);
      // once login complete redirect to home page for viewers to see posts
      this.router.navigate(['/']);
    }
}, error => {
  this.authStatusListener.next(false);
});
}
  logout() {
    // clear token value by setting it to null. seeting authentication to false
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    // once logout complete redirect to home page so non-authorized can not create posts
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  // method to timeout the user session after 1 hr
  private setAuthTimer(duration: number) {
   console.log('setting Timer: ' + duration);
   // logs out the user after one hours. set timeout takes in milli seconds
   this.tokenTimer = setTimeout(() => {
    this.logout();
  }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    // local storage stores the data in the browser session
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString()); // change the status to string
    localStorage.setItem('userId', userId);
  }
  private clearAuthData() {
    // removing the data from browser session when called in logout
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');

  }
  // method to see if the authorization is valid return the token & date data
  private getAuthData() {
    // retrives the data from local storage & sees if it is valid
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
     return;
    }
    return {
      // tslint:disable-next-line:object-literal-shorthand
      token: token,
      expirationDate: new Date(expirationDate),
      // tslint:disable-next-line:object-literal-shorthand
      userId: userId
    };
  }
}
