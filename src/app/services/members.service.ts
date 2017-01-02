//Angular
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//AngularFire
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
//Models
import { AccountsModel } from '../models/accounts';
import { MembersModel } from '../models/members';
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

    changeAdmin(object: AdminMembersModel, target: string): void {
        let updateobj: Object;
        if(target == 'paid') {
            updateobj = { paid: object[target] };
        } else if(target == 'admin'){
            updateobj = { admin: object[target] };
        }
        this.loginservice.af.database.list('/users').update(object['$key'], updateobj);
    }

}