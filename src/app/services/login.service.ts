//Angular
import { Injectable }     from '@angular/core';
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
    public user = {};
    public self = {};

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

    login(login: LoginModel ): Promise<boolean> {
        let creds: Object = { email: login.email, password: login.password };
        return new Promise((resolve, reject) => {
            this.af.auth.login(creds)
            .then(result => { resolve(result); })
            .catch(error => { reject(error.message || error ); });
        });
    }

    loginGoogle(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.af.auth.login({
                provider: AuthProviders.Google,
                method: AuthMethods.Popup
            })
            .then(result => {
                this.af.database.object(`/users/${result.auth.uid}`).set({
                    name: result.auth.displayName,
                    email: result.auth.email,
                    photo: result.auth.photoURL,
                });
                resolve(result);
            })
            .catch(error => { reject(error.message || error ) });
        });
    }

    doRegister(register: AccountsModel): Promise<boolean> {
        let creds: any = { email: register["email"], password: register["password"] };
        return new Promise((resolve, reject) => {
            this.af.auth.createUser(creds).then(result => {
                this.af.database.object(`/users/${result.auth.uid}`).set({
                    name: register.firstname + " " + register.lastname,
                    email: register.email,
                });
                resolve(result);
            })
            .catch(error => { reject(error.message || error ) });
        });
    }

    logout(): void {
        this.af.auth.logout();
        this.user = {};
        this.self = {};
        this.router.navigate(['/login']);
    }

    isLoggedIn(): Boolean {
        return (Object.keys(this.user).length > 0);
    }

    forgotPassword(email: string): Promise<Boolean> {
        let auth = firebase.auth();
        return new Promise((resolve, reject) => {
            auth.sendPasswordResetEmail(email)
                .then( result => { resolve(result); })
                .catch( error => { reject(error)});
        });
    }

}