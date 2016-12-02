//Angular
import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
//Backand
import { BackandService } from 'angular2bknd-sdk';
//Models
import { LoginModel } from '../models/login';
import { AccountsModel } from '../models/accounts';

@Injectable()
export class LoginService {
    public user = {};
    public self = {};

    constructor (
        private router: Router,
        private backandService:BackandService
    ){ 
        this.backandService.setAppName('aTipper');
        //this.backandService.setSignUpToken('your backand signup token');
    }

    login(login: LoginModel ): Observable<any> {
        let $obs = this.backandService.signin(login.username, login.password);
        $obs.subscribe(data => { console.log(data)} );
        return $obs;
    }

    doRegister(register: AccountsModel):Observable<any> {
        let $obs = this.backandService.signup(register.email, register.password, register.password2, register.firstname, register.lastname);
        return $obs;
    }

    logout(): void {
        this.backandService.signout();
        this.user = {};
        this.self = {};
        this.router.navigate(['/login']);
    }

    isLoggedIn(): void {
        //return (Object.keys(this.user).length > 0);
    }

    forgotPassword(email: string): void {

    }

}