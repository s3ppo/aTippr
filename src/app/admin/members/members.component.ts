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
  selector: 'Members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MdSnackBar]
})

export class AdminMembersComponent implements OnInit{

  constructor(
    private loginService: LoginService,
    private membersService: MembersService,
    private snackBar: MdSnackBar,
  ){}

  private adminmembersmodel: AdminMembersModel[];

  getAllMembers(): void {
    this.membersService.getAll().subscribe(members  => { 
      this.adminmembersmodel = members;
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