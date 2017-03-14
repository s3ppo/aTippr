//Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
//Firebase
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
//Services
import { LoginService } from '../services/login.service';
//Models
import { RulesModel } from '../models/rules';

@Injectable()
export class RulesService {

  constructor (
      private loginService: LoginService,
      private router: Router
  ){}

    getAll(): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            let filter = { query: { orderByChild: 'sort' } };
            return this.loginService.af.database.list(userdata.gameid+`/admin/rules/`, filter);
        })
    }

    create(rule: RulesModel, key: String): void {
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.object(userdata.gameid+`/admin/rules/${key}`).set({ points: rule.points, active: rule.active, sort: rule.sort });
        })
    }

    change(rules: RulesModel[]): void {
        this.loginService.userdata.subscribe( userdata => {
            rules.forEach(rule => {
                this.loginService.af.database.object(userdata.gameid+`/admin/rules/${rule['$key']}`).update({ points: rule.points, active: rule.active, sort: rule.sort });
            })
        })
    }

    delete(key: String): void {
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.object(userdata.gameid+`/admin/rules/${key}`).remove();
        })
    }

}