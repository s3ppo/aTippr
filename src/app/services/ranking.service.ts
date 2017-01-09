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
        private loginService: LoginService,
    ){}

    getAll(): Observable<any> {
        return this.loginService.af.database.list(`/ranking/`).map((rankings) => {
            return rankings.map((ranking) => { 
                ranking.user = this.loginService.af.database.object(`/users/${ranking.$key}`);
                return ranking;
            });
        });
    }

}