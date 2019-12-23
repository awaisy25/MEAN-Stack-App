import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

// angular component for allowing current users to login

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isLoading = false;
  // retreive the data from the login form
  onLogin(form: NgForm) {
    console.log(form.value);
  }
}
