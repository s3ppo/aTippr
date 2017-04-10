//Angular
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
//Translate
import { TranslateService } from '@ngx-translate/core';
//Material
import { MdIconRegistry } from '@angular/material';
//Models
import { MembersModel } from './models/members';
import { ChatModel } from './models/chat';
//Services
import { LoginService } from './services/login.service';
import { MembersService } from './services/members.service';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MdIconRegistry]
})
export class AppComponent implements OnInit {

  @ViewChild('sidenavright') sidenavright: any;
  public member = new MembersModel('','','','','',0,0);
  public membersmodelviewAll: MembersModel[];
  public chatmodelview = new ChatModel(0, '', '');
  public chatmodelviewAll: ChatModel[];
  public lastChatActivity: number = 0;
  public admin: boolean = false;
  public logged: boolean = false;
  public authenticated: Observable<any>;

  constructor(
    public loginService: LoginService,
    public membersService: MembersService,
    public chatService: ChatService,
    public translate: TranslateService,
    public mdIconRegistry: MdIconRegistry,
    public sanitizer: DomSanitizer
  ) {
    //Custom Icons
    mdIconRegistry.addSvgIcon('ball', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/soccer.svg'));
    mdIconRegistry.addSvgIcon('cup', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/cup.svg'));
    //Translation
    translate.setDefaultLang('en');
    let lang = translate.getBrowserLang();
    translate.use(lang);
    //Check if user is logged
    this.authenticated = this.loginService.getAuthenticated();
    this.authenticated.subscribe( user => {
      this.loginService.setUser(user);
    });
  }

  logout(): void {
    this.loginService.logout();
  }

  getChat(): void {
    this.authenticated.subscribe(user => {
      if(user) {
        this.chatService.getLast(10).subscribe(chat => {
          this.chatmodelviewAll = chat;
          this.chatmodelviewAll = this.chatmodelviewAll.sort((n1,n2) => {
            if(n1.created < n2.created) {
              return 1;
            }
            if(n1.created > n2.created) {
              return -1;
            }
            return 0;
          });
          this.chatmodelviewAll.forEach( chat => {
            if(chat.created > this.lastChatActivity) {
              this.lastChatActivity = chat.created;
              // If sidenav is actually opened, then update the lastchatactivity in the members profile
              if(this.sidenavright.opened == true) {
                this.membersService.changeChatActivity();
              }
            }
          });
        });
      }
    });
  }

  getloggedUser(): void {
    this.authenticated.subscribe(user => {
      if(user) {
        this.membersService.get(user.uid).subscribe(member => {
          this.member = member;
          this.logged = true;
          if(this.member.hasOwnProperty('admin')) {
            if(this.member['admin'] == true) {
              this.admin = true;
            } else {
              this.admin = false;
            }
          }
          if(!this.member.hasOwnProperty('chatactivity')) {
            this.member.chatactivity = 0;
          }
        })
      } else {
        this.member = new MembersModel('','','','','',0,0);
        this.logged = null;
        this.admin = null;
      }
    })
  }

  ngOnInit(): void {
    this.getloggedUser();
    this.getChat();
  }

  toggleChat(navChat: any): void {
    navChat.toggle();
    this.membersService.changeChatActivity();
  }

  sendChatMessage(): void {
    if (this.chatmodelview.message.replace(/\s/g, "").length > 0) {
      this.chatService.create(this.chatmodelview);
    }
    this.chatmodelview = new ChatModel(0,'','');
  }

}
