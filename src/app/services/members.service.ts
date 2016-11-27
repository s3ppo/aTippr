import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//Firebase
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
//Models
import { LoginModel } from '../models/login';
import { AccountsModel } from '../models/accounts';
import { AdminMembersModel } from '../models/adminmembers';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class MembersService {

    constructor (
        private loginservice: LoginService,
    ){}

    getAll(): FirebaseListObservable<any> {
        return this.loginservice.af.database.list('/users/');
    }

    get(uid: string): FirebaseObjectObservable<any> {
        return this.loginservice.af.database.object(`/users/${uid}`);
    }

    changeAdmin(object: AdminMembersModel, attr: String): void {
        let updateobj: Object;
        //TODO
        this.loginservice.af.database.list('/users').update(`${object['$key']}`, updateobj);
    }

}