//Angular
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';  
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//Firebase
import { FirebaseObjectObservable } from 'angularfire2';
//Services
import { MembersService } from '../services/members.service';
import { LoginService } from '../services/login.service';

@Injectable()
export class AdminGuard implements CanActivate {
  private admin: boolean;
  private user = {};
  private self = {};

  constructor(
    private loginservice: LoginService,
    private membersservice: MembersService,
    private router: Router,
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //TODO
    return true;
  }

}