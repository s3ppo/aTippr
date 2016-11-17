import { Injectable }     from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//Firebase
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';
//Models
import { LoginModel } from '../models/login';
import { AccountsModel } from '../models/accounts';

@Injectable()
export class MembersService {

    items: FirebaseListObservable<any>;

    constructor (
        private router: Router,
        public af: AngularFire,
    ){}

    getAll(): FirebaseListObservable<any> {
        return this.af.database.list('/users');
    }

}