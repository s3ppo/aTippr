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

    private fileReader: FileReader;
    private base64: string;
    private teamsmodel = new TeamsModel('', null, '');
    private teamsmodelview: TeamsModelView[];

  constructor(
    private snackBar: MdSnackBar,
    private teamsservice: TeamsService,
  ){}

  selectFile(event): void {
    this.teamsmodel.flag = event.srcElement.files[0];

    var myReader:FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.base64 = myReader.result;
    }
    myReader.readAsDataURL(this.teamsmodel.flag);
  }

  doCreateTeam(): void {
    if(this.teamsmodel.flag == null || this.teamsmodel.flag == undefined){
      this.snackBar.open('Bitte eine Flagge hochladen!')
      return;
    }

    this.teamsservice.set(this.teamsmodel, this.base64);
  }

  getAllTeams(): void {
    this.teamsservice.getAll()
        .subscribe( teams => { this.teamsmodelview = teams });
  }

  delTeam(team): void {
    this.teamsservice.del(team);
  }

  ngOnInit(): void {
    this.getAllTeams();
  }

}