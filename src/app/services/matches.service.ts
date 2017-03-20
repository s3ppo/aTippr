//Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
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

    getAllwithTeams(category?: string): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            let filter: Object = {};
            if(category){
                filter = { query: { orderByChild: 'category', equalTo: category } };
            }
            return this.loginService.af.database.list(`/games/${userdata.gameid}/matches/`, filter).map((teams) => {
                return teams.map((team) => { 
                    team.team1sub = this.loginService.af.database.object(`/games/${userdata.gameid}/teams/${team.team1}`);
                    team.team2sub = this.loginService.af.database.object(`/games/${userdata.gameid}/teams/${team.team2}`);
                    return team;
                })
            })
        })
    }

    getAll(category?: string): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            let filter: Object = {};
            if(category){
                filter = { query: { orderByChild: 'category', equalTo: category } };
            }
            return this.loginService.af.database.list(`/games/${userdata.gameid}/matches/`, filter);
        })
    }

    create(object: MatchesModelAll): void {
        this.loginService.userdata.subscribe( userdata => {
            if(object.result1 == undefined) {
                delete object.result1;
            }
            if(object.result2 == undefined) {
                delete object.result2;
            }
            this.loginService.af.database.list(`/games/${userdata.gameid}/matches/`).push(object);
        })
    }

    remove(object: MatchesModelAll): void {
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.object(`/games/${userdata.gameid}/matches/${object['$key']}`).remove();
        })
    }

    setResult(object: MatchesModelAll): void {
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.object(`/games/${userdata.gameid}/matches/${object['$key']}`).update({ result1: object.result1, result2: object.result2 });
        })
    }

    getNextMatch(): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            let filter = { query: { orderByChild: 'matchstart', limitToFirst: 1, startAt: new Date().getTime() } };
            return this.loginService.af.database.list(`/games/${userdata.gameid}/matches/`, filter);
        })
    }

}