//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Models
import { MatchesModelDashboard } from '../models/matches'
//Services
import { LoginService } from '../services/login.service';
import { MatchesService } from '../services/matches.service';
import { TeamsService } from '../services/teams.service';

@Component({
  selector: 'Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit{
  private matchesmodel = new MatchesModelDashboard('', '', '', '', 0, 0, 0, 0, 0, '', '');
  private preloadingDone: boolean = false;

  constructor(
    private loginService: LoginService,
    private matchesService: MatchesService,
    private teamsService: TeamsService,
  ){}

  getNextMatch(): void {
    this.matchesService.getNextMatch().subscribe( nextMatch => {
      this.matchesmodel = nextMatch[0];
      this.matchesmodel['start'] = new Date(this.matchesmodel.matchstart).toLocaleString();
      this.teamsService.get(nextMatch[0].team1).subscribe( team1 => {
        this.matchesmodel['flag1'] = team1.flag;
        this.teamsService.get(nextMatch[0].team2).subscribe( team2 => {
          this.matchesmodel['flag2'] = team2.flag;
          this.preloadingDone = true;
        });
      })
    })
  }

  ngOnInit(): void {
    this.getNextMatch();
  }

}