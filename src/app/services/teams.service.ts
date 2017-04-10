//Angular
import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//AngularFire
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';
//Models
import { TeamsModel } from '../models/teams';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class TeamsService {
    public firebase: any;

    constructor (
        public loginService: LoginService,
        public af: AngularFire,
        @Inject(FirebaseApp) firebase: any,
    ){
        this.firebase = firebase;
    }

    getAll(): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            return this.loginService.af.database.list(`/games/${userdata.gameid}/teams/`);
        })
    }

    get(key: string): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            return this.loginService.af.database.object(`/games/${userdata.gameid}/teams/${key}`);
        })
    }

    create(object: TeamsModel, file: File): void {
        this.loginService.userdata.subscribe( userdata => {
            this.uploadImage(file)
                .then(  result => { object.flag = result;
                                    this.loginService.af.database.list(`/games/${userdata.gameid}/teams/`).push(object); },
                        error  => {  }
            );
        });
    }

    uploadImage(image: File): Promise<String> {
        return new Promise<String>((resolve, reject) => {
            let uploadTask = this.firebase.storage().ref(`/teams/${image.name}`).put(image);
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
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.list(`/games/${userdata.gameid}/teams/${object['$key']}`).remove();
        })
    }

}