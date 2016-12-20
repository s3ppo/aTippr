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

@Component({
  selector: 'Members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MdSnackBar]
})

export class AdminMembersComponent implements OnInit{

  constructor(
    private membersservice: MembersService,
    private snackBar: MdSnackBar,
  ){}

  private adminmembersmodel: AdminMembersModel[];

  getAllMembers(): void {
    this.membersservice.getAll().subscribe(
                                  members  => { this.adminmembersmodel = members; },
                                  err      => { console.log(err) });
  }

  ngOnInit(): void {
    this.getAllMembers();
  }

  changeAdmin(index: number): void {
    this.membersservice.changeAdmin(this.adminmembersmodel[index], 'admin');
  }

  changePaid(index: number): void {
    this.membersservice.changeAdmin(this.adminmembersmodel[index], 'paid');
  }

  setnewPassword(index: number): void {

  }

}