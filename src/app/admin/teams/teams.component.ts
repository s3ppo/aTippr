//Angular
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material2
import { MdSnackBar } from '@angular/material';
//Models
import { TeamsModel } from '../../models/teams';
//Service
import { TeamsService } from '../../services/teams.service';
import { DialogsService } from '../../services/dialog.service';

@Component({
  selector: 'AdminTeams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [MdSnackBar],
})
export class AdminTeamsComponent implements OnInit {

    public Flag: File;
    public teamsmodel = new TeamsModel('', '', '');
    public teamsmodelAll: TeamsModel[];

  constructor(
    public snackBar: MdSnackBar,
    public teamsservice: TeamsService,
    public dialogsService: DialogsService, 
    public viewContainerRef: ViewContainerRef
  ){}

  selectFile(event): void {
    this.Flag = event.srcElement.files[0];
  }

  CreateTeam(): void {
    if(this.Flag == null || this.Flag == undefined){
      this.snackBar.open('Bitte eine Flagge hochladen!', 'Close', { duration: 2000 });
      return;
    }
    this.teamsservice.create(this.teamsmodel, this.Flag);
    this.snackBar.open('Neues Team '+ this.teamsmodel.teamname + ' wurde angelegt', 'Close', { duration: 2000 });
  }

  getAllTeams(): void {
    this.teamsservice.getAll()
      .subscribe( teams => { this.teamsmodelAll = teams });
  }

  delTeam(team): void {
    this.dialogsService
      .confirm('Bitte Bestätigen', 'Löschen von diesem Team wirklich durchführen?', this.viewContainerRef)
      .subscribe(res =>   {   
        if(res === true) {
          this.teamsservice.remove(team);
        }
      });
  }

  ngOnInit(): void {
    this.getAllTeams();
  }

}