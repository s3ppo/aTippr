//Angular
import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//AngularFire
import { AngularFire, FirebaseListObservable } from 'angularfire2'
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
    ) {}

    getAll(): FirebaseListObservable<any> {
        return this.loginservice.af.database.list('/teams/');
    }

}