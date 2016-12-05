import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//Backand
import { BackandService } from 'angular2bknd-sdk';
//Models
import { TeamsModel, TeamsModelView } from '../models/teams';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class TeamsService {
    private firebase: any;

    constructor (
        private loginservice: LoginService,
        private backandService: BackandService,
    ) {}

    getAll(): Observable<any> {
        return this.backandService.getList('teams')
    }

    /*get(uid: string): FirebaseObjectObservable<any> {
        return this.loginservice.af.database.object(`/teams/${uid}`);
    }*/

    set(object: TeamsModel) {
        this.uploadImage(object.flag)
            .then(result => {   },
                  error  => {   }
        );
    }

    /*del(object: TeamsModelView) {
        this.removeImage(object);
        this.loginservice.af.database.list(`/teams/${object['$key']}`).remove();
    }*/

    uploadImage(file: any): Promise<String> {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            this.backandService.uploadFile('teams', 'flag', file.filename, file.file).subscribe(
                data => {
                    console.log(data);
                    //data.url is the url of the uploaded file
                },
                err => this.backandService.logError(err),
                () => console.log('OK')
            );
        });
        return promise;
     }

    /*removeImage(object): Promise<String> {
        //TODO
        return;
     }*/

}