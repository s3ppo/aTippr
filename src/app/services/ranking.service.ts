//Angular
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
//AngularFire
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
//Models
import { RankingModel, RankingModelAll } from '../models/ranking';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class RankingService {

    constructor (
        private loginService: LoginService,
    ){}

    getAll(): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            return this.loginService.af.database.list(userdata.gameid+`/ranking/`).map((rankings) => {
                rankings.forEach(ranking => {
                    ranking.user = this.loginService.af.database.object(`/users/${ranking.$key}`);
                });
                return rankings;
            });
        });
    }

    change(ranking: RankingModel): void {
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.object(userdata.gameid+`/ranking/${ranking.user}`).update({points: ranking.points});
        })
    }

    changeDetail(member: string, match: string, points: number, tipp1: number, tipp2: number, team1: string, team2: string, result1: number, result2: number): void {
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.object(userdata.gameid+`/ranking/${member}/matches/${match}`).update({ points: points, tipp1: tipp1, tipp2: tipp2, team1: team1, team2: team2, result1: result1, result2: result2 });
        })
    }

    getDetailMember(user: string): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            return this.loginService.af.database.list(userdata.gameid+`/ranking/${user}/matches/`).map(rankings => {
                rankings.forEach(ranking => {
                    ranking.team1sub = this.loginService.af.database.object(userdata.gameid+`/teams/${ranking.team1}`);
                    ranking.team2sub = this.loginService.af.database.object(userdata.gameid+`/teams/${ranking.team2}`);
                });
                return rankings;
            });
        })
    }

    getDetailSelfMatch(match: string): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            return this.loginService.af.database.object(userdata.gameid+`/ranking/${this.loginService.user.uid}/matches/${match}`);
        });
    }

}
