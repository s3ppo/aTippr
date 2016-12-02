import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//Models
import { LoginModel } from '../models/login';
import { TeamsModel, TeamsModelView } from '../models/teams';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class TeamsService {
    private firebase: any;

    constructor (
        private loginservice: LoginService,
    ) {}

    /*getAll(): FirebaseListObservable<any> {
        return this.loginservice.af.database.list('/teams');
    }

    get(uid: string): FirebaseObjectObservable<any> {
        return this.loginservice.af.database.object(`/teams/${uid}`);
    }

    set(object: TeamsModel) {
        this.uploadImage(object.flag)
            .then(result => {   object.flag = result;
                                this.loginservice.af.database.list(`/teams/`).push(object); },
                  error  => {   }
        );
    }

    del(object: TeamsModelView) {
        this.removeImage(object);
        this.loginservice.af.database.list(`/teams/${object['$key']}`).remove();
    }

    uploadImage(imageData): Promise<String> {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            let uploadTask = firebase.storage().ref(`/teams/${imageData.name}`).put(imageData);
            uploadTask.on('state_changed', function(snapshot) {
            }, function(error) {
                reject(error);
            }, function() {
                var downloadURL = uploadTask.snapshot.downloadURL;
                resolve(downloadURL);
            });
        });
        return promise;
     }

    removeImage(object): Promise<String> {
        //TODO
        return;
     }*/

}