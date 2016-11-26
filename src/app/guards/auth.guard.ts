//Angular
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate{
  public allowed: boolean;

  constructor(
    private loginservice: LoginService,
    private router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.loginservice.af.auth.map((auth) =>  {
      if(auth == null) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    }).first();
  }
}