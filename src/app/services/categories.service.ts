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

}