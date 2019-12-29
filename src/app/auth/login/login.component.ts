import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

// angular component for allowing current users to login

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isLoading = false;
  constructor(public authService: AuthService) {}
  // retreive the data from the login form
  onLogin(form: NgForm) {
    // checking if form is valid. if it is send the email and passcode to login method from auth service.ts
    if (form.invalid) {
      return;
    }
    this.authService.login(form.value.email, form.value.password);
  }
}
