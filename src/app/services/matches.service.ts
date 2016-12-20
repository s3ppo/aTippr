//Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
//AngularFire
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
//Models
import { MatchesModel, MatchesModelAll } from '../models/matches';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class MatchesService {

    constructor (
        private loginService: LoginService,
        private http: Http,
        private router: Router,
    ){}

    getAll(): FirebaseListObservable<any> {
        return this.loginService.af.database.list('/matches/');
    }

    create(object: MatchesModelAll): void {
        this.loginService.af.database.list(`/matches/`).push(object);
    }

}