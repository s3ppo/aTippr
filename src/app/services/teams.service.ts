import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//Backand
import { BackandService } from 'angular2bknd-sdk';
//Models
import { TeamsModel } from '../models/teams';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class TeamsService {
    private firebase: any;

    constructor (
        private loginservice: LoginService,
        private backandService: BackandService,
    ) {}

    getAll(): Observable<TeamsModel[]> {
        return this.backandService.getList('teams');
    }

    /*get(uid: string): FirebaseObjectObservable<any> {
        return this.loginservice.af.database.object(`/teams/${uid}`);
    }*/

    set(object: TeamsModel, filecontent: string): Observable<boolean> {
        //TODO return Observable
        return new Observable<boolean>( observer => {
            this.addImage(object, filecontent)
                .subscribe(data     => {    object.flag = data.json().url;
                                            let $obs = this.backandService.create('teams', object);
                                            $obs.subscribe(data => { observer.next(true); }) },
                            err     => {    observer.next(false); });
        });
    }

    del(object: TeamsModel): Observable<any> {
        this.removeImage(object);
        return this.backandService.delete('teams', object['id']);
    }

    removeImage(object): Observable<any> {
        let $obs = this.backandService.deleteFile('items', 'files', object.flagname);
        return $obs;
    }

    addImage(object: TeamsModel, filecontent: string): Observable<any> {
        let $obs = this.backandService.uploadFile('items', 'files', object.flagname, filecontent);
        return $obs;
    }

}