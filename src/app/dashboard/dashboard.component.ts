import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Services
import { LoginService } from '../services/login.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit{

  constructor(
    private loginservice: LoginService,
    private membersservice: MembersService,
  ){}

  ngOnInit(): void {
    this.membersservice.get(this.loginservice.user['uid'])
        .subscribe( member => { });
  }

}