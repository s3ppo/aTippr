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
                this.router.navigate(['dashboard']);
            } else {
                this.user = {};
            }
        });
    }

    login(email: string, password: string): Promise<boolean> {
        var creds: any = { email: email, password: password };
        var res: Promise<boolean> = new Promise((resolve, reject) => {
            this.af.auth.login(creds).then(result => {
                this.af.database.object(`/users/${result.auth.uid}`).set({
                    name: result.auth.displayName
                });
                resolve(result);
            })
        });
        return res;
    }

    loginGoogle(): Promise<boolean> {
        var res: Promise<boolean> = new Promise((resolve, reject) => {
            this.af.auth.login({
                provider: AuthProviders.Google,
                method: AuthMethods.Popup
            }).then(result => {
                this.af.database.object(`/users/${result.auth.uid}`).set({
                    name: result.auth.displayName
                });
                resolve(result);
            })
        });
        this.router.navigate(['/dashboard']);
        return res;
    }

    doRegister(register: Object): void {
        var creds: any = { email: register["email"], password: register["password"] };
        this.af.auth.createUser(creds);
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