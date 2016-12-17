//Angular
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private loginservice: LoginService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginservice.af.auth
      .flatMap(auth => {
        if (auth == null) {
          return new Promise(resolve => { resolve({}) });
        } else {
          this.loginservice.setUser(auth);
          return this.loginservice.af.database.object(`users/${auth.uid}`);
        }
      })
      .map(data => {
        if (data.hasOwnProperty('admin')) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
      .first();
  }

}