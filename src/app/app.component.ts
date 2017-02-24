//Angular
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
//Translate
import { TranslateService } from 'ng2-translate';
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
  private admin: boolean;

  constructor(
    private membersService: MembersService,
    private loginService: LoginService,
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

  isAuth(): Observable<boolean> {
    return this.loginService.getAuthenticated().map(user => {
      if(user) {
        this.membersService.get(user.uid).subscribe(member => {
          this.member = member;
          if(!this.member.hasOwnProperty('chatactivity')) {
            this.member.chatactivity = 0;
          }
        });
        return true;
      } else {
        this.member = new MembersModel('','','','','',0,0);
        return false;
      }
    });
  }

  isAdmin(): Observable<boolean> {
    return this.loginService.getAdmin();
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

  ngOnInit(): void {
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
