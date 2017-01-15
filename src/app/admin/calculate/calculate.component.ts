//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
//Material
import { MdSnackBar } from '@angular/material';
//Models
import { MatchesModelAll } from '../../models/matches';
import { TippsModel } from '../../models/tipps';
import { MembersModel } from '../../models/members';
import { RankingModel } from '../../models/ranking';
//Services
import { MatchesService } from '../../services/matches.service';
import { TippsService } from '../../services/tipps.service';
import { MembersService } from '../../services/members.service';
import { RankingService } from '../../services/ranking.service';

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
  private progress: String;

  constructor(
    private matchesService: MatchesService,
    private tippsService: TippsService,
    private membersService: MembersService,
    private rankingService: RankingService,
    private snackBar: MdSnackBar,
  ){}

  calc(): void {
    this.matchesService.getAll().take(1).subscribe( match => {
      this.matchesmodelAll = match;
      this.matchesmodelAll.forEach((matchline, index) => {
        if(!matchline.result1 && !matchline.result2){
          this.matchesmodelAll.splice(index);
        }
      });
      this.membersService.getAll().take(1).subscribe( members => {
        members.forEach( (member, mindex) => {
          this.tippsService.getAllUser(member['$key']).subscribe( tipps => {
            let rankings = new RankingModel(member['$key'], 0);
            tipps.forEach((tipp, index) => {
              let points = this.calcMatch(tipp);
              rankings.points = rankings.points + points;
            })
            this.rankingService.change(rankings);
          })
        })
      })
    });
  }

  calcMatch(tipp: TippsModel): number {
    let matchpoints: number = 0;
    let match = this.matchesmodelAll.find(match => match['$key'] == tipp.match);
    if(!match){
      //match has actually no result
      return 0;
    }

    //points team1 correct
    if(tipp.tipp1 == match.result1) {
      matchpoints = matchpoints + 1;
    }
    //points team2 correct
    if(tipp.tipp2 == match.result2) {
      matchpoints = matchpoints + 1;
    }
    //points for number of goals correct
    if((tipp.tipp1 + tipp.tipp2) == (match.result1 + match.result2)) {
      matchpoints = matchpoints + 1;
    }
    //points for goal difference
    if((tipp.tipp1 - tipp.tipp2) == (match.result1 - match.result2)) {
      matchpoints = matchpoints + 3;
    }
    //points for correct winner of match
    if(tipp.tipp1 > tipp.tipp2 && match.result1 > match.result2) {
      //Winner of match was team1
      matchpoints = matchpoints + 4;
    } else if(tipp.tipp1 < tipp.tipp2 && match.result1 < match.result2) {
      //Winner of match was team2
      matchpoints = matchpoints + 4;
    } else if(tipp.tipp1 == tipp.tipp2 && match.result1 == match.result2) {
      //No winner was tipped
      matchpoints = matchpoints + 4;
    }

    return matchpoints;
  }

}