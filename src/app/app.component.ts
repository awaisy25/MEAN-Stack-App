import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = 'Welcome';
// calling the auto authorization method from auth service to help automitically authenticate
// the user after logging in & reloading the page until session is complete
  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
