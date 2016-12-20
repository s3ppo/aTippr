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

    getAll(): Observable<any> {
        return this.loginService.af.database.list('/matches/').map((teams) =>   {   
            return teams.map((team) => { 
                team.team1sub = this.loginService.af.database.object("/teams/" + team.team1);
                team.team2sub = this.loginService.af.database.object("/teams/" + team.team2);
                return team;
            });
        });
    }

    create(object: MatchesModelAll): void {
        this.loginService.af.database.list(`/matches/`).push(object);
    }

    remove(object: MatchesModelAll): void {
        this.loginService.af.database.object(`/matches/${object['$key']}`).remove();
    }

}