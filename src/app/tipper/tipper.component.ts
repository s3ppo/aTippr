//Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material2
import { MdSnackBar } from '@angular/material';
//Services
import { MatchesService } from '../services/matches.service';
import { TippsService } from '../services/tipps.service';
//Models
import { MatchesModel, MatchesModelTipper } from '../models/matches';
import { TippsModel } from '../models/tipps';

@Component({
  selector: 'Tipper',
  templateUrl: './tipper.component.html',
  styleUrls: ['./tipper.component.css'],
  providers: [MdSnackBar]
})
export class TipperComponent implements OnInit{

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private matchesService: MatchesService,
    private tippsService: TippsService,
    private snackBar: MdSnackBar,
  ){}

  private matchesmodelview: MatchesModelTipper[];
  private category: string;
  private categoryname: string;
  private tippsmodelview: TippsModel[];
  private loading: boolean;
  private preloadingDone: boolean = false;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.category = params['category'];
      this.categoryname = params['categoryname'];
    });
    this.getAllMatches(this.category);
  }

  getAllMatches(category: string): void {
    this.matchesService.getAll(category).subscribe(matches => {
      this.matchesmodelview = matches;
      this.matchesmodelview.forEach(match => {
        match.matchstart = new Date(match.matchstart).toLocaleString();
        let now = new Date();
        let deadline = new Date(match.deadline);
        if(now >= deadline) {
          match.disabled = 'true';
        } else {
          match.disabled = 'false';
        }
      })
      this.getAllTipps(category);
    });
  }

  getAllTipps(category: string): void {
    this.tippsService.getAll(category).subscribe(tipps => {
      this.tippsmodelview = tipps;
      this.mergeCollections();
      this.preloadingDone = true;
    });
  }

  mergeCollections() {
    this.matchesmodelview.forEach((match) => {
      let tippmerge = this.tippsmodelview.find(tipp => tipp.match == match['$key']);
      if(tippmerge){
        match.tippkey = tippmerge['$key'];
        match.tipp1 = tippmerge.tipp1;
        match.tipp2 = tippmerge.tipp2;
      }
    })
  }

  submitTipps(): void {
    let tippscreate = [];
    let tippsupdate = [];
    this.matchesmodelview.forEach(match => {
      if(match.hasOwnProperty('tippkey')) {
        if(match.hasOwnProperty('tipp1') && match.hasOwnProperty('tipp2')) {
          tippsupdate.push(new TippsModel( match.tippkey, this.category, match['$key'], match.tipp1, match.tipp2));
        }
      } else {
        if(match.hasOwnProperty('tipp1') && match.hasOwnProperty('tipp2')) {
          tippscreate.push(new TippsModel( '', this.category, match['$key'], match.tipp1, match.tipp2));
        }
      }
    })
    //Change existing
    this.tippsService.change(tippsupdate);
    //Create new
    this.tippsService.create(tippscreate);
    
    this.snackBar.open('Tipps wurden geändert!', 'Close', { duration: 2000 });
  }

}