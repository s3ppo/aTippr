//Angular
import { Component } from '@angular/core';
//Rxjs
import { Observable } from 'rxjs';
//AngularFire
import { AngularFire, FirebaseAuthState } from 'angularfire2';
//Models
import { MembersModel } from './models/members';
//Services
import { LoginService } from './services/login.service';
import { MembersService } from './services/members.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private member = new MembersModel('','','','');

  constructor(
    private membersService: MembersService,
    private loginService: LoginService,
    private af: AngularFire,
  ) {}

  private admin: boolean;
 
  logout(): void {
    this.loginService.logout();
  }

  isAuth(): Observable<boolean> {
    return this.loginService.getAuthenticated().map(user => {
      if(user) {
        this.membersService.get(user.uid).subscribe(member => {
          this.member = member;
        })
        return true;
      } else {
        this.member = new MembersModel('','','','');
        return false;
      }
    });
  }

  isAdmin(): Observable<boolean> {
    return this.loginService.getAdmin();
  }

}
