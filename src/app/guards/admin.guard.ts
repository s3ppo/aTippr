//Angular
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//Firebase
import { FirebaseObjectObservable } from 'angularfire2';
//Services
import { MembersService } from '../services/members.service';
import { LoginService } from '../services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private loginservice: LoginService,
    private membersservice: MembersService,
    private router: Router
  ){}

  private admin: boolean;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.membersservice.get(this.loginservice.user['uid'])
              .subscribe(member => { this.admin = member.admin });

    return this.admin;
  };

}