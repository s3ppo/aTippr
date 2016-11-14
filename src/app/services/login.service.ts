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
    private items: FirebaseListObservable<any[]>;

    constructor (
        public router: Router,
        public af: AngularFire
    ){
        this.af.auth.subscribe(user => {
            if (user) {
                this.user = user.auth.providerData[0];
                this.items = af.database.list('/items');
                this.router.navigate(['dashboard']);
            } else {
                this.user = {};
                this.items = null;
            }
        });
    }

    loginGoogle(): void {
        this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup
        })
        this.router.navigate(['/dashboard']);
    }

    logout(): void {
        this.af.auth.logout();
        this.user = {};
        this.items = undefined;
        this.router.navigate(['/login']);
    }

    isLoggedIn(): Boolean {
        return (Object.keys(this.user).length > 0);
    }

    getItems(): FirebaseListObservable<any[]> {
        return this.items;
    }

}