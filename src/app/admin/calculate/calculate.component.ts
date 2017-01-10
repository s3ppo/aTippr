//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Models
import { MatchesModelAll } from '../../models/matches';
import { TippsModel } from '../../models/tipps';
import { MembersModel } from '../../models/members';
//Services
import { MatchesService } from '../../services/matches.service';
import { TippsService } from '../../services/tipps.service';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'Calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css'],
  providers: []
})
export class AdminCalculateComponent {

  private matchesmodelAll: MatchesModelAll[];
  private tippsmodelAll: TippsModel[];
  private membersmodelAll: MembersModel[];

  constructor(
    private matchesService: MatchesService,
    private tippsService: TippsService,
    private membersService: MembersService,
  ){}

  calc(): void {
    this.matchesService.getAll().subscribe( match => {
      this.matchesmodelAll = match;
      this.membersService.getAll().subscribe( members => {
        members.forEach( member => {
          this.tippsService.getAllUsers(member['$key']).subscribe( tipps => {
            tipps.forEach(tipp => {
              let points = this.calcMatch(tipp);
            })
          })
        })
      })
    })
  }

  calcMatch(tipp: TippsModel): number {
    let matchpoints: number;
    let matchmerge = this.matchesmodelAll.find(match => match['$key'] == tipp.match);

    //calculate the points here

    return matchpoints;
  }

}