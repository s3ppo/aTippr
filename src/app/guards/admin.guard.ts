//Angular
import { Observable } from 'rxjs/Rx'; 
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//Backand
import { BackandService } from 'angular2bknd-sdk';
//Services
import { MembersService } from '../services/members.service';
import { LoginService } from '../services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {
    auth_status:    string = null;
    auth_type:      string = 'N/A';
    loggedInUser:   string = '';
    isAdmin:        boolean = false;

  constructor(
    private backandService: BackandService,
    private loginservice: LoginService,
    private router: Router,
  ){
    this.auth_type = backandService.getAuthType();
    this.auth_status = backandService.getAuthStatus();
    this.loggedInUser = backandService.getUsername();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.auth_status == 'OK') {
      return this.backandService.getUserDetails(true)
                         .map((data) =>   { if(data.role == 'AppAdmin') {
                                              return true;
                                            } else {
                                              return false;
                                            }
                                          })
    } else {
      return false;
    }
  }

}