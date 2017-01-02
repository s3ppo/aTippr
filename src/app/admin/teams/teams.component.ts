//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material2
import { MdSnackBar } from '@angular/material';
//Models
import { TeamsModel } from '../../models/teams';
//Service
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'Admin_Teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [MdSnackBar],
})
export class AdminTeamsComponent implements OnInit {

    private Flag: File;
    private teamsmodel = new TeamsModel('', '', '');
    private teamsmodelAll: TeamsModel[];

  constructor(
    private snackBar: MdSnackBar,
    private teamsservice: TeamsService,
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
    this.teamsservice.remove(team);
  }

  ngOnInit(): void {
    this.getAllTeams();
  }

}