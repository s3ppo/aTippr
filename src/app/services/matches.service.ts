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

}