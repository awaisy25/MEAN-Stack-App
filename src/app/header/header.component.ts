import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  // html tag to be put in the main html file
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  // subscription that subscribes to the authService observable
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService) {}
// life cycle hooks to manage authservice to retrive a true or false from the observable
  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }
  // clears jwt token, sets authListener back to false
  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
