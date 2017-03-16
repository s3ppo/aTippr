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
  private member = new MembersModel('','','','','',0,0);
  private membersmodelviewAll: MembersModel[];
  private chatmodelview = new ChatModel(0, '', '');
  private chatmodelviewAll: ChatModel[];
  private lastChatActivity: number = 0;
  private admin: boolean = false;
  private logged: boolean = false;

  constructor(
    private loginService: LoginService,
    private membersService: MembersService,
    private chatService: ChatService,
    private translate: TranslateService,
    private mdIconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    mdIconRegistry.addSvgIcon('ball', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/soccer.svg'));
    mdIconRegistry.addSvgIcon('cup', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/cup.svg'));
    translate.setDefaultLang('en');
    let lang = translate.getBrowserLang();
    translate.use(lang);
  }

  logout(): void {
    this.loginService.logout();
  }

  getChat(): void {
    this.loginService.getAuthenticated().subscribe(user => {
      if(user) {
        this.chatService.getLast(10).subscribe(chat => {
          this.chatmodelviewAll = chat.reverse();
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
    this.loginService.getAuthenticated().subscribe(user => {
      if(user) {
        this.membersService.get(user.uid).subscribe(user => {
            this.member = user;
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
