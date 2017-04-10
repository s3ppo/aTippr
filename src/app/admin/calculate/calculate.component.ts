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
  selector: 'AdminCalculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css'],
  providers: []
})
export class AdminCalculateComponent {

  public matchesmodelAll: MatchesModelAll[];
  public tippsmodelAll: TippsModel[];
  public membersmodelAll: MembersModel[];
  public progress: String = "";

  constructor(
    public matchesService: MatchesService,
    public tippsService: TippsService,
    public membersService: MembersService,
    public rankingService: RankingService,
    public snackBar: MdSnackBar,
  ){}

  calc(): void {
    this.matchesService.getAll().take(1).subscribe( match => {

      this.matchesmodelAll = [];
      match.forEach(matchline => {
        if(matchline.hasOwnProperty('result1') && matchline.hasOwnProperty('result2')){
          this.matchesmodelAll.push(matchline);
        }
      });

      this.membersService.getAll().take(1).subscribe( members => {
        members.forEach( (member, mindex) => {
          this.tippsService.getAllUser(member['$key']).take(1).subscribe( tipps => {
            let rankings = new RankingModel(member['$key'], 0);
            tipps.forEach((tipp, index) => {
              let points = this.calcMatch(tipp);
              let match = this.matchesmodelAll.find(match => match['$key'] == tipp.match);
              if(match){
                if(match.deadline <= new Date().getTime()) {
                  this.rankingService.changeDetail(member['$key'], tipp.match, points, tipp.tipp1, tipp.tipp2, match.team1, match.team2, match.result1, match.result2);
                }
              }
              rankings.points = rankings.points + points;
            });
            this.rankingService.change(rankings);
            this.progress = this.progress + member.firstName + " " + member.lastName + "-> DONE!<br>";
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
    if((tipp.tipp1 == null || tipp.tipp1 == undefined) || (tipp.tipp2 == null || tipp.tipp2 == undefined)) {
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
    //points for number of all goals correct
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

    return matchpoints * match.multiplier;
  }

}
