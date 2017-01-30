//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Models
import { MembersModel } from '../models/members';
//Service
import { MembersService } from '../services/members.service';

@Component({
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: []
})
export class ProfileComponent implements OnInit {

  private membersmodelview = new MembersModel('', '', '', '');

  constructor(
    private membersService: MembersService,
  ){}

  getMemberSelf(): void {
    this.membersService.getSelf().subscribe( member => {
      this.membersmodelview = member;
    })
  }

  ngOnInit(): void {
    this.getMemberSelf();
  }

}