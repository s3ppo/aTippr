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
import { MatchesModelTipper } from '../models/matches';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class TippsService {

  constructor (
      private loginService: LoginService,
      private router: Router,
  ){}

  // Get all Tipps - Admin method for calculations
  getAllUser(user: String): Observable<any> {
    return this.loginService.af.database.list(`/tipps/${user}`);
  }

  // Get all Tipps
  getAllOwnUser(category: String): Observable<any> {
    let filter: Object = { query: { orderByChild: 'category', equalTo: category } };
    return this.loginService.af.database.list(`/tipps/${this.loginService.user.uid}`, filter);
  }

  // Change Tipps
  change(tipps: Array<TippsModel>): void {
    tipps.forEach(tipp => {
      this.loginService.af.database.object(`/tipps/${this.loginService.user.uid}/${tipp.tippkey}`).update({ tipp1: tipp.tipp1, tipp2: tipp.tipp2 }).then( (item) => {
        this.loginService.af.database.object(`/tipps_open/public/${tipp.match}/${tipp.tippkey}`).update({ tipp1: tipp.tipp1, tipp2: tipp.tipp2 });
        this.loginService.af.database.object(`/tipps_open/secure/${tipp.match}/${tipp.tippkey}`).update({ user: this.loginService.user.uid, tipp1: tipp.tipp1, tipp2: tipp.tipp2 });
      });
    })
  }

  //Create Tipps
  create(tipps: Array<TippsModel>): void {
    tipps.forEach(tipp => {
      this.loginService.af.database.list(`/tipps/${this.loginService.user.uid}`).push({ category: tipp.category, match: tipp.match, tipp1: tipp.tipp1, tipp2: tipp.tipp2 }).then( (item) => {
        this.loginService.af.database.object(`/tipps_open/public/${tipp.match}/${item.key}`).update({ tipp1: tipp.tipp1, tipp2: tipp.tipp2 });
        this.loginService.af.database.object(`/tipps_open/secure/${tipp.match}/${item.key}`).update({ user: this.loginService.user.uid, tipp1: tipp.tipp1, tipp2: tipp.tipp2 });
      });
    })
  }

  //Read open tipps
  getOpenTipps(match: String): Observable<any> {
    return this.loginService.af.database.list(`/tipps_open/public/${match}`);
  }

  /*//Set open tipps
  setOpenTipp(tipp: TippsModel, user: String) {
    this.loginService.af.database.object(`/tipps_open/public/${tipp.match}/${tipp['$key']}`).update({ tipp1: tipp.tipp1, tipp2: tipp.tipp2 });
    this.loginService.af.database.object(`/tipps_open/secure/${tipp.match}/${tipp['$key']}`).update({ user: user, tipp1: tipp.tipp1, tipp2: tipp.tipp2 })
  }*/

}