//Angular
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//Services
import { MembersService } from '../services/members.service';
import { LoginService } from '../services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {

  private member = {};

  constructor(
    private membersservice: MembersService,
    private loginservice: LoginService,
    private router: Router
  ){
    this.membersservice.get(this.loginservice.user['uid'])
        .subscribe( member => { this.member = member })
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if( this.member.hasOwnProperty('admin') ) {
      return this.member['admin'];
  }

}