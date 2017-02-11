import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MembersService } from '../services/members.service';
import { MembersModel } from '../models/members';

@Component({
  selector: 'Members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: []
})
export class MembersComponent implements OnInit {

  constructor(
    private router: Router,
    private membersservice: MembersService,
  ){}

  private membersmodel: MembersModel[];
  private timerSubscription: any = null;
  private onlinecheck: number;

  ngOnInit(): void {
    this.getAllMembers();

    let timer = Observable.timer(1000, 1000);
    this.timerSubscription = timer.subscribe((t:any) => {
      this.onlinecheck = new Date().getTime() - 300000;
    });
  }

  getAllMembers(): void {
    this.membersservice.getAll().subscribe(data => {
      this.membersmodel = data;
      this.membersmodel.forEach(member => {
        if(member.lastactivity == null){
          member.lastactivity = 0;
        }
        if(member.photo == null || member.photo == undefined){
          member.photo = member.photoSocial;
        }
      })
    })
  }

  ngOnDestroy() {
    if (this.timerSubscription != null) {
        this.timerSubscription.unsubscribe();
    }
  }

}