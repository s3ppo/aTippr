//Angular
import { Injectable } from '@angular/core';
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
    auth_status:    string = null;
    auth_type:      string = 'N/A';
    loggedInUser:   string = '';
    isAdmin:        boolean = false;

    constructor (
        private router: Router,
        private backandService:BackandService
    ){
        this.backandService.setAppName('atipper')
        this.backandService.setSignUpToken('ea073201-5dea-4c45-9d7b-3c155513cdda');
        this.backandService.setAnonymousToken('dc201b54-8f35-41b7-8def-eea36ef80ec6');
        this.auth_type = backandService.getAuthType();
        this.auth_status = backandService.getAuthStatus();
        this.loggedInUser = backandService.getUsername();
        if(this.auth_status == 'OK') {
            this.getOwnUser();
        }
    }

    login(login: LoginModel ): Observable<any> {
        this.auth_type = 'Token';
        let $obs = this.backandService.signin(login.username, login.password)
        $obs.subscribe( data =>  {  this.auth_status = 'OK';
                                    this.loggedInUser = data.username;
                                    this.getOwnUser();
                                 },
                        err  =>  {  var errorMessage = this.backandService.extractErrorMessage(err);
                                    this.auth_status = `Error: ${errorMessage}`;  });
        return $obs;
    }

    loginSocial(provider: string): Observable<any> {
        let $obs = this.backandService.socialSignin(provider);
        return $obs;
    }

    register(register: AccountsModel):Observable<any> {
        let $obs = this.backandService.signup(register.email, register.password, register.password2, register.firstname, register.lastname);
        return $obs;
    }

    logout(): void {
        this.backandService.signout();
        this.auth_status = '';
        this.auth_type = '';
        this.loggedInUser = '';
        this.router.navigate(['/login']);
    }

    forgotPassword(email: string): void {

    }

    getOwnUser(): void {
        let filter =    [{
                            fieldName: 'email',
                            operator: 'contains',
                            value: this.loggedInUser,
                        }]

        this.backandService.getList('users', null, null, filter)
            .subscribe(
                data => {   this.isAdmin = data[0].admin },
                err =>  {   this.backandService.logError(err) } );
    }

}