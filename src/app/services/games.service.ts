//Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
//AngularFire
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
//Models
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class GamesService {

    constructor (
        private loginService: LoginService,
        private http: Http,
    ){}

    getAll(gameName?: String): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            let filter: Object = {};
            if(gameName) {
                filter = { query: { orderByChild: 'gamename', equalTo: gameName } };
            }
            return this.loginService.af.database.object(`/games/`, filter);
        });
    }
}