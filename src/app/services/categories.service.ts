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
import { CategoriesModel } from '../models/categories';

@Injectable()
export class CategoriesService {

  constructor (
      private loginService: LoginService,
      private router: Router
  ){}

    getAll(): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            return this.loginService.af.database.list(`/games/${userdata.gameid}/categories/`);
        })
    }

    create(object: CategoriesModel): void {
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.list(`/games/${userdata.gameid}/categories/`).push(object);
        })
    }

    delete(key: String): void {
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.object(`/games/${userdata.gameid}/categories/${key}`).remove();
        })
    }

}