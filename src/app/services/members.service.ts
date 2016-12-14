//Angular
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//Backand
import { BackandService } from 'angular2bknd-sdk';
//Models
import { AccountsModel } from '../models/accounts';
import { MembersModel } from '../models/members';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class MembersService {

    constructor (
        private loginservice: LoginService,
        private backandService:BackandService
    ){}

    getAll(): FirebaseListObservable<any> {
        return this.loginservice.af.database.list('/users/');
    }

    get(uid: string): FirebaseObjectObservable<any> {
        if(this.loginservice.user != {}){
            return this.loginservice.af.database.object(`/users/${uid}`);
        }
    }

    changeAdmin(object: AdminMembersModel): void {
        let updateobj: Object;
        //TODO prepare updateobj
        this.loginservice.af.database.list('/users').update(`${object['$key']}`, updateobj);
    }

}