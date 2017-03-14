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
import { ChatModel } from '../models/chat';

@Injectable()
export class ChatService {

    constructor (
        private loginService: LoginService,
        private membersService: MembersService,
        private router: Router
    ){ }

    getLast(number: number): Observable<any> {
        return this.loginService.userdata.flatMap( userdata => {
            let filter = { query: { orderByChild: 'created', limitToLast: number } };
            return this.loginService.af.database.list(userdata.gameid+`/chat/`, filter).map(chats => {
                chats.forEach(chat => {
                    chat.member = this.membersService.get(chat.user);
                });
                return chats;
            });
        }).first();
    }

    create(object: ChatModel): void {
        this.loginService.userdata.subscribe( userdata => {
            object.user = this.loginService.user.uid;
            object.created = new Date().getTime();
            this.loginService.af.database.list(userdata.gameid+`/chat/`).push(object);
        })
    }

    delete(key: String): void {
        this.loginService.userdata.subscribe( userdata => {
            this.loginService.af.database.object(userdata.gameid+`/chat/${key}`).remove();
        })
    }

}
