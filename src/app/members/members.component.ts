import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MembersService } from '../services/members.service';
import { AccountsModel } from '../models/accounts';

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

  membersmodel: Array<AccountsModel>;

  ngOnInit(): void {
      this.membersservice.getAll()
          .subscribe( members => { this.membersmodel = members });
  }

}