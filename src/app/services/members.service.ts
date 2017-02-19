//Angular
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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
        private loginService: LoginService,
    ){}

    getAll(): FirebaseListObservable<any> {
        return this.loginService.af.database.list('/users');
    }

    get(uid: string): FirebaseObjectObservable<any> {
        return this.loginService.af.database.object(`/users/${uid}`);
    }

    getSelf(): FirebaseObjectObservable<any> {
        return this.loginService.af.database.object(`/users/${this.loginService.user.uid}`);
    }

    setSelf(members: MembersModel): void {
        this.loginService.af.database.object(`/users/${this.loginService.user.uid}`).update({ firstName: members.firstName, lastName: members.lastName });
    }

    changeAdmin(object: AdminMembersModel, target: string): void {
        let updateobj: Object;
        if(target == 'paid') {
            updateobj = { paid: object[target] };
        } else if(target == 'admin'){
            updateobj = { admin: object[target] };
        }
        this.loginService.af.database.list('/users').update(object['$key'], updateobj);
    }

    changeChatActivity(): void {
        this.loginService.af.database.object(`/users/${this.loginService.user.uid}`).update({ chatactivity: new Date().getTime() });
    }

}