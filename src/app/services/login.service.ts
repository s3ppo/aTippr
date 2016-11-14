import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//Firebase
import { AngularFire, AuthProviders, FirebaseListObservable, AuthMethods } from 'angularfire2';
//Models
import { LoginModel } from '../models/login';

@Injectable()
export class LoginService {
    private user = {};

    constructor (
        public router: Router,
        public af: AngularFire,
    ){
        this.af.auth.subscribe(user => {
            if (user) {
                this.user = user.auth.providerData[0];
            } else {
                this.user = {};
            }
        });
    }

    login(login: LoginModel ): Promise<boolean> {
        let creds: Object = { email: login.email, password: login.password };
        let res: Promise<boolean> = new Promise((resolve, reject) => {
            this.af.auth.login(creds)
            .then(result => { resolve(result); })
            .catch(error => { reject(error.message); });
        });
        return res;
    }

    loginGoogle(): Promise<boolean> {
        let res: Promise<boolean> = new Promise((resolve, reject) => {
            this.af.auth.login({
                provider: AuthProviders.Google,
                method: AuthMethods.Popup
            })
            .then(result => {
                this.af.database.object(`/users/${result.auth.uid}`).set({
                    name: result.auth.displayName
                });
                resolve(result);
            })
            .catch(error => { reject(error.message) });
        });
        return res;
    }

    doRegister(register: Object): Promise<boolean> {
        let creds: any = { email: register["email"], password: register["password"] };
        let res: Promise<boolean> = new Promise((resolve, reject) => {
            this.af.auth.createUser(creds).then(result => {
                this.af.database.object(`/users/${result.auth.uid}`).set({
                    name: result.auth.displayName
                });
                resolve(result);
            })
            .catch(error => { reject(error.message) });
        });
        return res;
    }

    logout(): void {
        this.af.auth.logout();
        this.user = {};
        this.router.navigate(['/login']);
    }

    isLoggedIn(): Boolean {
        return (Object.keys(this.user).length > 0);
    }

    getUser(): Object {
        return this.user;
    }

}