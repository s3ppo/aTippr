import { Component } from '@angular/core';

// Services
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private loginservice: LoginService,
  ) {}

  this
 
  logout(): void {
    this.loginservice.logout();
  }

  isAuth(): Boolean {
    return this.loginservice.isLoggedIn();
  }

  isAdmin(): Boolean {
    if(this.loginservice.self.hasOwnProperty('admin')) {
      return true;
    } else {
      return false;
    }
  }

}
