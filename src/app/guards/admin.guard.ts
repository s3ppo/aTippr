//Angular
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//Services
import { MembersService } from '../services/members.service';
import { LoginService } from '../services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private loginservice: LoginService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if( this.loginservice.self.hasOwnProperty('admin') ) {
      return this.loginservice.self['admin'];
    }
  }

}