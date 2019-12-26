import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

// angular component for allowing current users to sign up. similar set up to login

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  isLoading = false;
  // constructor to retrive auth service object
  constructor(public authService: AuthService) {}
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // using create user function from auth service
    this.authService.createUser(form.value.email, form.value.password);
  }
}
