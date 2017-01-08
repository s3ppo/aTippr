//Angular
import { Component } from '@angular/core';
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
export class RankingComponent {

  constructor(
    private router: Router,
    private snackBar: MdSnackBar,
  ){}

}