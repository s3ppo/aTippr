//Angular
import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//AngularFire
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
//Models
import { TeamsModel } from '../models/teams';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class TeamsService {
    private firebase: any;

    constructor (
        private loginservice: LoginService,
        private af: AngularFire,
        @Inject(FirebaseApp) firebase: any,
    ){
        this.firebase = firebase;
    }

    getAll(): FirebaseListObservable<any> {
        return this.loginservice.af.database.list('/teams/');
    }

    create(object: TeamsModel, file: File): void {
        this.uploadImage(file)
            .then(  result => { object.flag = result;
                                this.loginservice.af.database.list(`/teams/`).push(object); },
                    error  => {  }
        );
    }

    uploadImage(image: File): Promise<String> {
        return new Promise<String>((resolve, reject) => {
            let uploadTask = firebase.storage().ref(`/posts/${image.name}`).put(image);
            uploadTask.on('state_changed', function(snapshot) {
            }, function(error) {
                reject(error);
            }, function() {
                var downloadURL = uploadTask.snapshot.downloadURL;
                resolve(downloadURL);
            });
        });
     }

    remove(object: TeamsModel): void {
        this.loginservice.af.database.list(`/teams/${object['$key']}`).remove();
    }

}