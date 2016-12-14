// Imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { CategoriesModel } from '../models/categories';

@Injectable()
export class CategoriesService {

  constructor (
      private http: Http,
      private router: Router 
  ){}
/*
  // get all existing Categories
  getAll(): Observable<CategoriesModel[]> {
    let categoriesUrl = this.CategoriesUrl + '?ts='+Date.now();
    let headers = new Headers({"Authorization": this.auth});
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.CategoriesUrl, options)
                    .map((res:Response) => res.json()._items)
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  // Create a new Category
  create(name: Object): Observable<CategoriesModel> {
    let headers = new Headers({"Authorization": this.auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.CategoriesUrl, name, options)
                    .map((res:Response) => {
                      if(res.status == 200){
                        res.json();
                      }
                    })
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));
  }

  // Get a specified Category
  get(name: string): Observable<CategoriesModel> {
    let getUrl = this.CategoriesUrl + '?where={"_id":"' + name + '"}';
    let headers = new Headers({"Authorization": this.auth});
    let options = new RequestOptions({ headers: headers });

    return this.http.get(getUrl, options)
                    .map((res:Response) => res.json()._items[0])
                    .catch((error:any) => Observable.throw(error.json()._error.message || 'Server error'));

  }

  // Delete existing Category
  delete(category: Object): Observable<CategoriesModel> {
    let delUrl = this.CategoriesUrl + '/' + category['_id'];
    let headers = new Headers({"Authorization": this.auth});
    headers.append("If-Match", category['_etag']);
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
*/
}