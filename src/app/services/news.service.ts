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
      public loginService: LoginService,
      public membersService: MembersService,
      public router: Router
  ){}

    getLast(number: number): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            let filter = { query: { orderByChild: 'created', limitToLast: number } };
            return this.loginService.af.database.list(`/games/${userdata.gameid}/admin/news/`, filter);
        })
    }

    create(object: NewsModel): void {
        this.loginService.userdata.subscribe( userdata => {
            object.user = this.loginService.user.uid;
            object.created = new Date().getTime();
            this.loginService.af.database.list(`/games/${userdata.gameid}/admin/news/`).push(object);
        })
    }

    change(object: NewsModel): void {
        this.loginService.userdata.subscribe( userdata => {
            if(object['$key']) {
                this.loginService.af.database.object(`/games/${userdata.gameid}/admin/news/${object['$key']}`).update({ user: this.loginService.user.uid, created: new Date().getTime(), text: object.text });
            } else {
                this.create(object);
            }
        })
    }

    delete(key: String): void {
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.object(`/games/${userdata.gameid}/admin/news/${key}`).remove();
        })
    }

}