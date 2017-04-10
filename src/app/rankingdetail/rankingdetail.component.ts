//Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material
import { MdSnackBar } from '@angular/material';
//Services
import { RankingService } from '../services/ranking.service';

@Component({
  selector: 'RankingDetail',
  templateUrl: './rankingdetail.component.html',
  styleUrls: ['./rankingdetail.component.scss'],
  providers: [MdSnackBar]
})
export class RankingDetailComponent implements OnInit {

  public rankingDetail = [];
  public preloadingDone: boolean;
  public member: string;
  public membername: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public snackBar: MdSnackBar,
    public rankingService: RankingService,
  ){}

  getParams(): void {
    this.route.params.forEach((params: Params) => {
      this.member = params['member'];
      this.membername = params['membername'];
    });
  }

  getRankingDetail(): void {
    this.rankingService.getDetailMember(this.member).subscribe(rankingdetail => {
      this.rankingDetail = rankingdetail;
    })
  }

  ngOnInit(): void {
    this.getParams();
    this.getRankingDetail();
  }

}