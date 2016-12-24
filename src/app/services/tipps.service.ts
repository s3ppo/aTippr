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
  getAll(): FirebaseListObservable<any> {
    return this.loginService.af.database.list('/tipps/');
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