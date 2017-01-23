//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Models
import { MatchesModelAll } from '../models/matches'
//Services
import { LoginService } from '../services/login.service';
import { MatchesService } from '../services/matches.service';

@Component({
  selector: 'Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit{
  private matchesmodel = new MatchesModelAll('', '', '', '', 0, 0, 0, 0, 0);

  constructor(
    private loginService: LoginService,
    private matchesService: MatchesService,
  ){}

  getNextMatch(): void {
    this.matchesService.getNextMatch().subscribe( nextMatch => {
      this.matchesmodel = nextMatch[0];
      this.matchesmodel['start'] = new Date(this.matchesmodel.matchstart).toLocaleString();
    })
  }

  ngOnInit(): void {
    this.getNextMatch();
  }

}