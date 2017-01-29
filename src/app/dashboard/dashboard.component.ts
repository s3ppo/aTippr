//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Models
import { MatchesModelDashboard } from '../models/matches';
import { MembersModel } from '../models/members';
//Services
import { LoginService } from '../services/login.service';
import { MatchesService } from '../services/matches.service';
import { TeamsService } from '../services/teams.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit{

  private membersmodel: MembersModel[];
  private membersOnline: number;
  private matchesmodel = new MatchesModelDashboard('', '', '', '', 0, 0, 0, 0, 0, '', '');
  private preloadingNextMatchDone: boolean = false;
  private preloadingMembersDone: boolean = false;

  constructor(
    private loginService: LoginService,
    private matchesService: MatchesService,
    private teamsService: TeamsService,
    private membersService: MembersService,
  ){}

  getNextMatch(): void {
    this.matchesService.getNextMatch().subscribe( nextMatch => {
      this.matchesmodel = nextMatch[0];
      this.matchesmodel['start'] = new Date(this.matchesmodel.matchstart).toLocaleString();
      this.teamsService.get(nextMatch[0].team1).take(1).subscribe( team1 => {
        this.matchesmodel['flag1'] = team1.flag;
        this.teamsService.get(nextMatch[0].team2).take(1).subscribe( team2 => {
          this.matchesmodel['flag2'] = team2.flag;
          this.preloadingNextMatchDone = true;
        });
      })
    })
  }

  getMembers(): void {
    this.membersService.getAll().subscribe( members => {
      this.membersmodel = members;
      this.membersOnline = 0;
      this.membersmodel.forEach( member => {
        if(member.lastactivity >= (new Date().getTime() - 300000)){
          this.membersOnline = this.membersOnline + 1;
        }
      })
      this.preloadingMembersDone = true;
    })
  }

  ngOnInit(): void {
    this.getNextMatch();
    this.getMembers();
  }

}