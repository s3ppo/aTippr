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
import { MatchesModel } from '../models/matches';
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

  private matchesmodelview: MatchesModel[];
  private categoryname: string;
  private tippsmodelview = [];
  private loading: boolean;
  private preloadingDone: boolean = false;

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let category = params['category'];
      this.categoryname = params['categoryname'];
      this.getAllTipps();
    });
  }

  getAllMatches(category: string): void {
    //get matches for the selected category
    /*this.matchesService.getAll(category).subscribe(matches => {
      matches.forEach((match) => {
        this.getTippforMatch(match.$key);
      });
      this.matchesmodelview = matches;
      this.preloadingDone = true; 
    })*/
  }

  getAllTipps(): void {
    this.tippsService.getAll().subscribe(tipps => {
      this.tippsmodelview = tipps;
      this.preloadingDone = true; 
    }, err   => { });
  }

  /*createTippsCollection(matches: Array<MatchesModel>): TippsModel[] {
    let tippermodel = [];
    let matchexists: boolean;
    let newtipp: TippsModel;

    for(let i=0; i<matches.length; i++){
      matchexists = false;
      
      for(let a=0;a<this.tippsmodelview.length;a++){
        if(matches[i]['_id'] == this.tippsmodelview[a].matchid && matchexists == false) {
          matchexists = true;
          tippermodel.push(this.tippsmodelview[a]);
        }
      }
      if(matchexists == false) {
        // Create
        newtipp = new TippsModel(matches[i]['_id'], -1, -1);
        tippermodel.push(newtipp);
        this.tippsservice.create(newtipp)
                         .subscribe(
                            tipps => { this.tippsmodelview[i]['_etag'] = tipps['_etag']; this.tippsmodelview[i]['_id'] = tipps['_id']; },
                            err   => { });
      }
    };
    return tippermodel;
  }*/

  submitTipps(): void {
    /*this.loading = true;
    for(let i=0;i<this.tippsmodelview.length;i++){
      // Update Tipps
      this.tippsservice.change(this.tippsmodelview[i])
                        .subscribe(
                          tipps => {  if(this.tippsmodelview.length-1 == i){
                                        this.loading = false;
                                        this.snackBar.open('Deine Tipps wurden geändert', 'Close');
                                      }
                                      this.tippsmodelview[i]['_etag'] = tipps['_etag']; },
                          err   => {  this.loading = false; 
                                      this.snackBar.open(err, 'Close'); });
    };*/
  }

}