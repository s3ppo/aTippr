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
    var reader:FileReader = new FileReader();
    reader.onloadend = (e) => {
      var img = document.createElement("img");
      img.src = reader.result;

      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var MAX_WIDTH = 450;
      var MAX_HEIGHT = 450;
      var width = img.width;
      var height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      let dataurl = canvas.toDataURL(event.srcElement.files[0].type);
      var blob = this.dataURItoBlob(dataurl)
      this.uploadfile = new File([blob], event.srcElement.files[0].name, {type: event.srcElement.files[0].type, lastModified: Date.now()});
    }
    reader.readAsDataURL(event.srcElement.files[0]);
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
    this.membersService.setSelf(this.membersmodelview, this.uploadfile);

    this.translate.get('Dein Profil wurde geändert').subscribe( translation => {
      this.snackBar.open(translation, 'Close', {duration: 2000})
    });
  }

  dataURItoBlob(dataURI: string): Blob{
      const bytes = dataURI.split(',')[0].indexOf('base64') >= 0 ?
          atob(dataURI.split(',')[1]) :
          encodeURI(dataURI.split(',')[1]);
      const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const max = bytes.length;
      const ia = new Uint8Array(max);
      for (var i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
      return new Blob([ia], {type:mime});
  };

}