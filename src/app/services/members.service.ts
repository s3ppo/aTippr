//Angular
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//Rxjs
import { Observable } from 'rxjs';
//Backand
import { BackandService } from 'angular2bknd-sdk';
//Models
import { AccountsModel } from '../models/accounts';
import { MembersModel } from '../models/members';
//Services
import { LoginService } from '../services/login.service';

@Injectable()
export class MembersService {

    constructor (
        private loginservice: LoginService,
        private backandService:BackandService
    ){}

    getAll(): Observable<MembersModel[]> {
        return this.backandService.getList('users')
    }

}