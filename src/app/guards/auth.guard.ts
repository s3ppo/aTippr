//Angular
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate{
    auth_status:    string = null;

  constructor(
    private router: Router,
    private loginservice: LoginService,
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginservice.getAuthenticated().map(user => {
          this.loginservice.setUser(user);
          if(user){
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
    })
  }

}