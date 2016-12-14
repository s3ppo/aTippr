//Angular
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//AngularFire
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2'
//Models
import { AccountsModel } from '../models/accounts';
import { MembersModel } from '../models/members';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class MembersService {

    constructor (
        private loginservice: LoginService,
        private af: AngularFire
    ){}

    getAll(): FirebaseListObservable<any> {
        return this.loginservice.af.database.list('/users/');
    }

    get(uid: string): FirebaseObjectObservable<any> {
        return this.loginservice.af.database.object(`/users/${uid}`);
    }

}