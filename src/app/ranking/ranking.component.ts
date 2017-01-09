//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material
import { MdSnackBar } from '@angular/material';
//Models
import { RankingModel } from '../models/ranking';
//Services
import { RankingService } from '../services/ranking.service';

@Component({
  selector: 'Ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  providers: [MdSnackBar]
})
export class RankingComponent implements OnInit {

  constructor(
    private router: Router,
    private snackBar: MdSnackBar,
    private rankingService: RankingService,
  ){}

  private rankingmodel: RankingModel[];

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
    });
  }

}