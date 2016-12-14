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

  public user: any;

    constructor (
        private router: Router,
        public af: AngularFire,
    ){
        /*this.af.auth.subscribe(user => {
            if (user) {
                this.user = user.auth;
            } else {
                this.user = {};
            }
        });*/
    }

        setUser(user): void { 
            this.user = user; 
        }

        getAuthenticated(): Observable<any> { 
            return this.af.auth; 
        }

        emailLogin(login: LoginModel): Promise<any> {
            let creds: any = { email: login.email, password: login.password };
            let provider: any = { provider: AuthProviders.Password, method: AuthMethods.Password };
            return new Promise((resolve, reject) => {
                this.af.auth.login(creds, provider)
                    .then(result => { resolve(result); })
                    .catch(error => { reject(error.message || error ); });
            });
        }

        logout(): void {
            this.af.auth.logout();
        }

}