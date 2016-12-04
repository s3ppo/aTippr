import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MembersService } from '../services/members.service';
import { MembersModel } from '../models/members';

@Component({
  selector: 'Members',
  templateUrl: 'members.component.html',
  styleUrls: ['./members.component.css'],
  providers: []
})
export class MembersComponent implements OnInit {

  constructor(
    private router: Router,
    private membersservice: MembersService,
  ){}

  membersmodel: Array<MembersModel>;

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers(): void {
    this.membersservice.getAll()
        .subscribe(data => { this.membersmodel = data })
  }

}