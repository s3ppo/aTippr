//Angular
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
//AngularFire
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
//Models
import { RankingModel } from '../models/ranking';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class RankingService {

    constructor (
        private loginservice: LoginService,
    ){}

    getAll(): FirebaseListObservable<any> {
        return this.loginservice.af.database.list('/ranking/');
    }

}