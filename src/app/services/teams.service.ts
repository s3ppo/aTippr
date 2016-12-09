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

    getAll(): Observable<TeamsModelView[]> {
        return this.backandService.getList('teams')
    }

    /*get(uid: string): FirebaseObjectObservable<any> {
        return this.loginservice.af.database.object(`/teams/${uid}`);
    }*/

    set(object: TeamsModel, filecontent: string) {
        this.backandService.uploadFile('items', 'files', object.flag.name, filecontent)
            .subscribe(data =>  {   console.log(data.json()._body.url);let createteam = new TeamsModelView(object.teamname, object.group, "");
                                    let $obs = this.backandService.create('teams', createteam);
                                    $obs.subscribe((data) => console.log(data));
                                },
                       err =>  {   }
        );
    }

    del(object: TeamsModelView): Observable<any> {
        //this.removeImage(object);
        let $obs = this.backandService.delete('teams', object['id']);
        return $obs;
    }

    /*removeImage(object): Promise<String> {
        //TODO
        return;
     }*/

}