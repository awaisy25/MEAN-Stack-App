import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

// angular component for allowing current users to login

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSubs: Subscription;
  constructor(public authService: AuthService) {}

  // setting a life cycle to recieve the authentication info froma auth service
  ngOnInit() {
    // will return true if user is login false if user does not exist
    this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        // set spinner to false if user does not exist
        this.isLoading = false;
      }
    );
  }
  // retreive the data from the login form
  onLogin(form: NgForm) {
    // checking if form is valid. if it is send the email and passcode to login method from auth service.ts
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
   // once sign up is complete it will remove authaurization status
   ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }
}
