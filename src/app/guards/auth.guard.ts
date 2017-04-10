//Angular
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(
    public router: Router,
    public loginService: LoginService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.loginService.getAuthenticated().map(user => {
      this.loginService.setUser(user);
      if(user) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    })
  }

}