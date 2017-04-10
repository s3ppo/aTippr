//Angular
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//Services
import { LoginService } from '../services/login.service';
import { MembersService } from '../services/members.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    public loginService: LoginService,
    public membersService: MembersService,
    public router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.loginService.af.auth.flatMap( auth => {
        if (auth == null) {
          return new Promise(resolve => { resolve({}) });
        } else {
          this.loginService.setUser(auth);
          return this.membersService.get(auth.uid);
        }
      })
      .map( data => {
        if (data.hasOwnProperty('admin')) {
          if( data.admin == true ) {
            return true;
          } else {
            return false;
          }
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
      .first();
  }

}