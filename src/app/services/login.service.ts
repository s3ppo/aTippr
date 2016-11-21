import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//Firebase
import { AngularFire, AuthProviders, FirebaseListObservable, AuthMethods } from 'angularfire2';
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
                //get and store userdata from logged-in user
                this.af.database.object(`/users/${user.uid}`)
                    .subscribe(member => { this.self = member }); 
            } else {
                this.user = {};
                this.self = {};
            }
        });
    }

    login(login: LoginModel ): Promise<boolean> {
        let creds: Object = { email: login.email, password: login.password };
        let res: Promise<boolean> = new Promise((resolve, reject) => {
            this.af.auth.login(creds)
            .then(result => { resolve(result); })
            .catch(error => { reject(error.message || error ); });
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
                    name: result.auth.displayName,
                    email: result.auth.email,
                    photo: result.auth.photoURL,
                });
                resolve(result);
            })
            .catch(error => { reject(error.message || error ) });
        });
        return res;
    }

    doRegister(register: AccountsModel): Promise<boolean> {
        let creds: any = { email: register["email"], password: register["password"] };
        let res: Promise<boolean> = new Promise((resolve, reject) => {
            this.af.auth.createUser(creds).then(result => {
                this.af.database.object(`/users/${result.auth.uid}`).set({
                    name: register.firstname + " " + register.lastname,
                    email: register.email,
                });
                resolve(result);
            })
            .catch(error => { reject(error.message || error ) });
        });
        return res;
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
        let res: Promise<boolean> = new Promise((resolve, reject) => {
            auth.sendPasswordResetEmail(email)
                .then( result => { resolve(result); })
                .catch( error => { reject(error)});
        });
        return res;
    }

}