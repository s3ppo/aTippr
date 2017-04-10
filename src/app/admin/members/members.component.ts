//Angular
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material2
import { MdSnackBar } from '@angular/material';
//Models
import { AdminMembersModel } from '../../models/adminmembers';
//Services
import { MembersService } from '../../services/members.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'AdminMembers',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MdSnackBar]
})

export class AdminMembersComponent implements OnInit{

  constructor(
    public loginService: LoginService,
    public membersService: MembersService,
    public snackBar: MdSnackBar,
  ){}

  public adminmembersmodel: AdminMembersModel[];

  getAllMembers(): void {
    this.membersService.getAll(true).subscribe(members  => {
        this.adminmembersmodel = members;
        this.adminmembersmodel = this.adminmembersmodel.sort((n1,n2) => {
          if(n1['lastactivity'] < n2['lastactivity']) {
            return 1;
          }
          if(n1['lastactivity'] > n2['lastactivity']) {
            return -1;
          }
          if(!n1.hasOwnProperty('lastactivity')) {
            return 1;
          }
          return 0;
        });
    });
  }

  ngOnInit(): void {
    this.getAllMembers();
  }

  changeAdmin(index: number): void {
    //user is not allowed to change admin of own user
    if(this.adminmembersmodel[index]['$key'] != this.loginService.user.uid){
      this.membersService.changeAdmin(this.adminmembersmodel[index], 'admin');
    }
  }

  changePaid(index: number): void {
    this.membersService.changeAdmin(this.adminmembersmodel[index], 'paid');
  }

}