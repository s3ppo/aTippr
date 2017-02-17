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
        return this.loginService.af.database.list(`/ranking/`).map((rankings) => {
            return rankings.map((ranking) => {
                ranking.user = this.loginService.af.database.object(`/users/${ranking.$key}`);
                return ranking;
            });
        });
    }

    change(ranking: RankingModel): void {
        this.loginService.af.database.object(`/ranking/${ranking.user}`).update({points: ranking.points});
    }

    changeDetail(member: string, match: string, points: number, tipp1: number, tipp2: number) {
        this.loginService.af.database.object(`/ranking/${member}/matches/${match}`).update({points: points, tipp1: tipp1, tipp2: tipp2});
    }

}