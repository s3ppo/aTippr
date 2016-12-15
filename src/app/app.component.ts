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
    private membersservice: MembersService,
    private loginservice: LoginService,
    private af: AngularFire,
  ) {}

  private admin: boolean;
 
  logout(): void {
    this.loginservice.logout();
  }

  isAuth(): Observable<boolean> {
    /*if(this.loginservice.user) {
      if(this.loginservice.user.hasOwnProperty('uid')) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }*/
    return this.loginservice.getAuthenticated()
               .map(user => user && user.hasOwnProperty('uid'))
  }

  isAdmin(): Observable<boolean> {
    return this.loginservice.getAdmin().map(user => {
          return user ? true : false;
    })
  }

}
