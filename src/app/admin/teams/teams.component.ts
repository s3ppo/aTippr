//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material2
import { MdSnackBar } from '@angular/material';
//Models
import { TeamsModel, TeamsModelView } from '../../models/teams';
//Service
import { TeamsService } from '../../services/teams.service';

@Component({
  selector: 'Admin_Teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [MdSnackBar],
})
export class AdminTeamsComponent implements OnInit {

  constructor(
    private snackBar: MdSnackBar,
    private teamsservice: TeamsService,
  ){}

  private teamsmodel = new TeamsModel('', null, '');
  private teamsmodelview: TeamsModelView[];

  selectFile(event): void {
    this.teamsmodel.flag = event.srcElement.files[0];
  }

  doCreateTeam(): void {
    if(this.teamsmodel.flag == null || this.teamsmodel.flag == undefined){
      this.snackBar.open('Bitte eine Flagge hochladen!')
      return;
    }

    this.teamsservice.set(this.teamsmodel);
  }

  getAllTeams(): void {
    this.teamsservice.getAll().subscribe( teams => { this.teamsmodelview = teams });
  }

  delTeam(team): void {
  }

  ngOnInit(): void {
    this.getAllTeams();
  }

}