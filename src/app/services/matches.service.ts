// Imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs';

import { MatchesModel } from '../models/matches';
import { LoginService } from '../services/login.service';

@Injectable()
export class MatchesService {

  constructor (
      private http: Http,
      private router: Router,
  ){}

/*
  // Get all existing Matches
  getAll(category?: string): Observable<MatchesModel[]> {
    let url = this.MatchesUrl + '?embedded={"team1":1,"team2":1,"category":1}&ts='+Date.now();

    //check if a category is set
    if(category != undefined && category != ""){
        url = url + '&where={"category":"'+category+'"}';
    }

    let headers = new Headers({ 'Authorization': this.auth });
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                    .map((res:Response) => res.json()._items)
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  // Create a new Match 
  create(name: Object) {
    let headers = new Headers({"Authorization": this.auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.MatchesUrl, name, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  // Delete existing Match
  delete(match: Object): Observable<MatchesModel> {
    let delUrl = this.MatchesUrl + '/' + match['_id'];
    let headers = new Headers({"Authorization": this.auth});
    headers.append("If-Match", match['_etag']);
    headers.append("Content-Type", "application/json");
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(delUrl, options)
                    .map((res:Response) => {
                        if(res.status == 204){
                            return [{ status: res.status, json: res }]
                        }
                    })
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

    // Change a Tipp
  change(object: Object): Observable<MatchesModel> {
    let chgUrl = this.MatchesUrl + '/' + object['_id'];
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.auth);
    headers.append('If-Match', object['_etag']);
    let options = new RequestOptions({ headers: headers });
    let body = '{'+'"result1":"'+object['result1']+'","result2":"'+object['result2']+'"}';

    return this.http.patch(chgUrl, body, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }
*/
}