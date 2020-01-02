import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

// angular component for allowing current users to sign up. similar set up to login

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSubs: Subscription;
// setting a life cycle to recieve the authentication info froma auth service
  ngOnInit() {
    // will return true if user is new authenticate. false if user already exists
    this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        // set spinner to false if user already exists
        this.isLoading = false;
      }
    );
  }
  // constructor to retrive auth service object
  constructor(public authService: AuthService) {}
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    // using create user function from auth service
    this.authService.createUser(form.value.email, form.value.password);
    }
    // once sign up is complete it will remove authaurization status
    ngOnDestroy() {
      this.authStatusSubs.unsubscribe();
    }
  }

