//Angular
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//Backand
import { BackandService } from 'angular2bknd-sdk';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthGuard implements CanActivate{
    auth_status:    string = null;

  constructor(
    private router: Router,
    private backandService: BackandService,
  ){
    this.backandService.setAppName('atipper')
    this.backandService.setSignUpToken('ea073201-5dea-4c45-9d7b-3c155513cdda');
    this.backandService.setAnonymousToken('dc201b54-8f35-41b7-8def-eea36ef80ec6');
    this.auth_status = backandService.getAuthStatus();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth_status == "OK") {
      return true;
    } else {
      return false;
    }
  }

}