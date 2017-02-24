//Angular
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
//Firebase
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
//Services
import { LoginService } from '../services/login.service';
import { MembersService } from '../services/members.service';
//Models
import { NewsModel } from '../models/news';

@Injectable()
export class NewsService {

  constructor (
      private loginService: LoginService,
      private membersService: MembersService,
      private router: Router
  ){}

    getLast(number: number): Observable<any> {
        let filter = { query: { orderByChild: 'created', limitToLast: number } };
        return this.loginService.af.database.list('/news/', filter);
    }

    create(object: NewsModel): void {
        object.user = this.loginService.user.uid;
        object.created = new Date().getTime();
        this.loginService.af.database.list(`/news/`).push(object);
    }

    update(object: NewsModel): void {
        if(object['$key']) {
            this.loginService.af.database.object(`/news/${object['$key']}`).update({ user: this.loginService.user.uid, created: new Date().getTime(), text: object.text });
        } else {
            this.create(object);
        }
    }

    delete(key: String): void {
        this.loginService.af.database.object(`/news/${key}`).remove();
    }

}