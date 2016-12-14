//Angular
import { Component } from '@angular/core';
//Rxjs
import { Observable } from 'rxjs';
//AngularFire
import { AngularFire, FirebaseAuthState } from 'angularfire2';
//Services
import { LoginService } from './services/login.service';
import { MembersService } from './services/members.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private loginservice: LoginService,
    private af: AngularFire,
  ) {}

  private admin: boolean;
 
  logout(): void {
    this.loginservice.logout();
  }

  isAuth(): boolean {
    return true;
  }

  isAdmin(): boolean {
    return false;
  }

}
