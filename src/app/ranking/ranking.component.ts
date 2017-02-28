//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material
import { MdSnackBar } from '@angular/material';
//Models
import { RankingModelAll } from '../models/ranking';
//Services
import { RankingService } from '../services/ranking.service';

@Component({
  selector: 'Ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  providers: [MdSnackBar]
})
export class RankingComponent implements OnInit {

  private rankingmodel: RankingModelAll[];
  private preloadingDone: boolean;

  constructor(
    private router: Router,
    private snackBar: MdSnackBar,
    private rankingService: RankingService,
  ){}

  ngOnInit(): void {
    this.rankingService.getAll().subscribe(ranking => {
      this.rankingmodel = ranking;
      this.rankingmodel = this.rankingmodel.sort((n1,n2) => {
        if(n1.points < n2.points) {
          return 1;
        }
        if(n1.points > n2.points) {
          return -1;
        }
        return 0;
      });
      this.preloadingDone = true;
    });
  }

}