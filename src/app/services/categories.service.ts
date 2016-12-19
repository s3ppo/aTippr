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

    getAll(): FirebaseListObservable<any> {
        return this.loginService.af.database.list('/categories/');
    }

    create(object: CategoriesModel): void {
        this.loginService.af.database.list(`/categories/`).push(object);
    }

    delete(key: String): void {
        this.loginService.af.database.object(`/categories/${key}`).remove();
    }

}