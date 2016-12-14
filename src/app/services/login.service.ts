//Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//Firebase
import { AngularFire, AuthProviders, FirebaseListObservable, FirebaseObjectObservable, AuthMethods } from 'angularfire2';
//Models
import { LoginModel } from '../models/login';
import { AccountsModel } from '../models/accounts';

@Injectable()
export class LoginService {

    constructor (
        private router: Router,
        public af: AngularFire,
    ){
        this.af.auth.subscribe(user => {
            if (user) {
                this.user = user;
                this.af.database.object(`/users/${user.uid}`)
                    .subscribe(user => { this.self = user });
            } else {
                this.user = {};
            }
        });
    } 

    login(login: LoginModel ): Observable<any> {
        this.auth_type = 'Token';
        let $obs = this.backandService.signin(login.username, login.password)
        $obs.subscribe( data =>  {  this.auth_status = 'OK';
                                    this.loggedInUser = data.username;
                                    this.getAdmin().subscribe(data =>   {   if(data.role == 'AppAdmin') {
                                                                                this.isAdmin = true;
                                                                            } else {
                                                                                this.isAdmin = false;
                                                                            } 
                                                                        });
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
        this.isAdmin = false;
        this.router.navigate(['/login']);
    }

    forgotPassword(email: string): void {

    }

    getAdmin(): Observable<any> {
        return this.backandService.getUserDetails(true);
    }
}