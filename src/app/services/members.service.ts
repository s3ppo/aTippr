//Angular
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
        if(this.loginservice.user != {}){
            return this.loginservice.af.database.object(`/users/${uid}`);
        }
    }

    changeAdmin(object: AdminMembersModel, target: string): void {
        let updateobj: Object;
        if(target == 'paid') {
            updateobj = { paid: object[target] };
        } else if(target == 'admin'){
            updateobj = { admin: object[target] };
        }
        this.loginservice.af.database.list('/users').update(`${object['$key']}`, updateobj);
    }

}