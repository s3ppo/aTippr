//Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//AngularFire
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
//Models
import { TippsModel } from '../models/tipps';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class TippsService {

  constructor (
      private loginService: LoginService,
      private router: Router,
  ){}

  // Get all Tipps
  getAll(match: String): Observable<any> {
    let filter: Object = { query: { orderByChild: 'match', equalTo: match } };
    return this.loginService.af.database.list('/tipps/', filter).map((tipps) => {   
      return tipps.map((tipp) => { 
        return tipp.matchsub = this.loginService.af.database.object("/matches/" + tipp.match).map((matches) => {
          return matches.map((match) => {
            match.team1sub = this.loginService.af.database.object("/teams/" + match.team1);
            match.team2sub = this.loginService.af.database.object("/teams/" + match.team2);
            return match;
          })
        });
     });
   });
  }

  // Create Initial Tipps for User and Category
  create(category: String): void {

  }

  // Create a new Tipp
/*create(name: TippsModel): Observable<TippsModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.auth);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.TippsUrl, name, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }*/

  // Get Single Tipp by matchid  --> not in use
  /*getbyMatch(matchid: string): Observable<TippsModel> {
    let tippUrl = this.TippsUrl + '?where={"matchid":"'+matchid+'"}';
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.auth);
    let options = new RequestOptions({ headers: headers });
    
    return this.http.get(tippUrl, options)
                    .map((res:Response) => res.json()._items[0])
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }*/

  // Change a Tipp
  /*change(object: Object): Observable<TippsModel> {
    let tippUrl = this.TippsUrl + '/' + object['_id'];
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.auth);
    headers.append('If-Match', object['_etag']);
    let options = new RequestOptions({ headers: headers });
    let body = '{'+'"tipp1":"'+object['tipp1']+'","tipp2":"'+object['tipp2']+'"}';

    return this.http.patch(tippUrl, body, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }*/

}