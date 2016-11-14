import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//Firebase
import { AngularFire, AuthProviders } from 'angularfire2';
//Models
import { LoginModel } from '../models/login';

@Injectable()
export class LoginService {
    private user = {};

    constructor (
        public af: AngularFire
    ){
        this.af.auth.subscribe(user => {
            if(user) {
                // user logged in
                this.user = user;
            } else {
                // user not logged in
                this.user = {};
            }
        });
    }

    loginGoogle(): void {
        this.af.auth.login({
            provider: AuthProviders.Google
        })
    }

    logout(): void {
        this.af.auth.logout();
    }

}