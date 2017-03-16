//Angular
import { Injectable , Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
//AngularFire
import { FirebaseListObservable, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';
//Models
import { AccountsModel } from '../models/accounts';
import { MembersModel } from '../models/members';
import { AdminMembersModel } from '../models/adminmembers';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class MembersService {
    private firebase: any;

    constructor (
        private loginService: LoginService,
        @Inject(FirebaseApp) firebase: any,
    ){
        this.firebase = firebase;
    }

    getAll(sort?: boolean): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            let filter: any;
            if(sort) {
                filter = { query: { orderByChild: 'lastactivity' } };
            }
            return this.loginService.af.database.list(userdata.gameid+`/users/`, filter);
        })
    }

    get(uid: string): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            return this.loginService.af.database.object(userdata.gameid+`/users/${uid}`);
        })
    }

    getSelf(): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            return this.loginService.af.database.object(userdata.gameid+`/users/${this.loginService.user.uid}`);
        })
    }

    setSelf(members: MembersModel, file?: File): void {
        this.loginService.userdata.subscribe( userdata => {
            if(file){
                this.uploadImage(file).then(  result => { 
                    this.loginService.af.database.object(userdata.gameid+`/users/${this.loginService.user.uid}`).update({ firstName: members.firstName, lastName: members.lastName, photo: result })
                },
                error  => {  });
            } else {
                this.loginService.af.database.object(userdata.gameid+`/users/${this.loginService.user.uid}`).update({ firstName: members.firstName, lastName: members.lastName });
            }
        })
    }

    changeAdmin(object: AdminMembersModel, target: string): void {
        this.loginService.userdata.subscribe( userdata => {
            let updateobj: Object;
            if(target == 'paid') {
                updateobj = { paid: object[target] };
            } else if(target == 'admin'){
                updateobj = { admin: object[target] };
            }
            this.loginService.af.database.list(userdata.gameid+`/users`).update(object['$key'], updateobj);
        })
    }

    changeChatActivity(): void {
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.object(userdata.gameid+`/users/${this.loginService.user.uid}`).update({ chatactivity: new Date().getTime() });
        })
    }

    uploadImage(image: File): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let uploadTask = this.firebase.storage().ref(`/avatars/${image.name}`).put(image);
            uploadTask.on('state_changed', function(snapshot) {
            }, function(error) {
                reject(error);
            }, function() {
                var downloadURL = uploadTask.snapshot.downloadURL;
                resolve(downloadURL);
            });
        });
    }

}