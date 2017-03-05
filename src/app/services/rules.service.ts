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
        return this.loginService.af.database.list('/rules/');
    }

    create(object: RulesModel): void {
        this.loginService.af.database.list(`/rules/`).push(object);
    }

    update(object: RulesModel): void {
        this.loginService.af.database.object(`/rules/${object['$key']}`).update(object);
    }

    delete(key: String): void {
        this.loginService.af.database.object(`/rules/${key}`).remove();
    }

}