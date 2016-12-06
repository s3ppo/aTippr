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
        this.backandService.uploadFile('teams', 'files', object.flag.filename, 'TODO').subscribe(
                data => {   console.log(data); },
                err =>  {   console.log(err); }
        );
    }

    /*del(object: TeamsModelView) {
        this.removeImage(object);
        this.loginservice.af.database.list(`/teams/${object['$key']}`).remove();
    }*/

    /*removeImage(object): Promise<String> {
        //TODO
        return;
     }*/

}