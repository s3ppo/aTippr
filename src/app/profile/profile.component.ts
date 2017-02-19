//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Translate
import { TranslateService } from 'ng2-translate';
//Material
import { MdSnackBar } from '@angular/material';
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

  private membersmodelview = new MembersModel('', '', '', '', '');
  private uploadfile: File;

  constructor(
    private membersService: MembersService,
    private snackBar: MdSnackBar,
   private translate: TranslateService
  ){}

  selectFile(event): void {
    this.uploadfile = event.srcElement.files[0];
  }

  getMemberSelf(): void {
    this.membersService.getSelf().subscribe( member => {
      this.membersmodelview = member;
      if(this.membersmodelview.photo == null || this.membersmodelview.photo == undefined) {
        this.membersmodelview.photo = this.membersmodelview.photoSocial;
      }
    })
  }

  ngOnInit(): void {
    this.getMemberSelf();
  }

  doProfileChange(): void {
    this.membersService.setSelf(this.membersmodelview);

    this.translate.get('Dein Profil wurde geändert').subscribe( translation => {
      this.snackBar.open(translation, 'Close', {duration: 2000})
    });
  }

}