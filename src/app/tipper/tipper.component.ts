//Angular
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Translate
import { TranslateService } from 'ng2-translate';
//Material
import { MdSnackBar } from '@angular/material';
//Services
import { MatchesService } from '../services/matches.service';
import { TippsService } from '../services/tipps.service';
import { TeamsService } from '../services/teams.service';
import { DialogsService } from '../services/dialog.service';
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
    private teamsService: TeamsService,
    private snackBar: MdSnackBar,
    private translate: TranslateService,
    private dialogsService: DialogsService,
    private viewContainerRef: ViewContainerRef,
  ){}

  private matchesmodelview: MatchesModelTipper[];
  private category: string;
  private categoryname: string;
  private tippsmodelview: TippsModel[];
  private preloadingDone: boolean = false;
  private nomatches: boolean = false;
  private timerSubscription: any = null;
  private now: number = new Date().getTime();

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.category = params['category'];
      this.categoryname = params['categoryname'];
    });
    this.getAllMatches(this.category);
    let timer = Observable.timer(1000, 1000);
    this.timerSubscription = timer.subscribe((t:any) => {
      this.now = new Date().getTime();
    });
  }

  getAllMatches(category: string): void {
    this.matchesService.getAll(category).subscribe(matches => {
      this.matchesmodelview = matches;
      this.matchesmodelview = this.matchesmodelview.sort((n1,n2) => {
        if(n1.deadline < n2.deadline) {
          return -1;
        }
        if(n1.deadline > n2.deadline) {
          return 1;
        }
        return 0;
      });
      this.checkNoMatches();
      this.matchesmodelview.forEach((match, index) => {
        match['start'] = new Date(match.matchstart).toLocaleString();
        this.teamsService.get(match.team1).take(1).subscribe( team1 => {
          match['team1name'] = team1.teamname;
          match['team1flag'] = team1.flag;
          this.teamsService.get(match.team2).take(1).subscribe( team2 => {
            match['team2name'] = team2.teamname;
            match['team2flag'] = team2.flag;
          })
        })
      })
      this.getAllTipps(category);
    });
  }

  checkNoMatches(): void {
    if(this.matchesmodelview.length <= 0){
      this.nomatches = true;
      this.preloadingDone = true;
    } else {
      this.nomatches = false;
    }
  }

  getAllTipps(category: string): void {
    this.tippsService.getAllOwnUser(category).subscribe(tipps => {
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
      if(match.deadline > new Date().getTime()){
        if(match.hasOwnProperty('tippkey')) {
          if(match.hasOwnProperty('tipp1') && match.hasOwnProperty('tipp2')) {
            tippsupdate.push(new TippsModel( match.tippkey, this.category, match['$key'], match.tipp1, match.tipp2));
          }
        } else {
          if(match.hasOwnProperty('tipp1') && match.hasOwnProperty('tipp2')) {
            tippscreate.push(new TippsModel( '', this.category, match['$key'], match.tipp1, match.tipp2));
          }
        }
      }
    })

    //Change existing tipps
    this.tippsService.change(tippsupdate);
    //Create new tipps
    this.tippsService.create(tippscreate);

    this.translate.get('Tipps wurden geändert', 'Close').subscribe( translation => {
      this.snackBar.open(translation, 'Close', { duration: 2000 });
    })
  }

  getBackground(match: any): String {
    if(match.hasOwnProperty('deadline')){
      if(this.now >= match.deadline) {
          return 'LightGrey ';
      } else {
          return 'Transparent';
      }
    }
  }

  showOtherTipps(match: String, team1: String, team2: String): void {
    this.dialogsService.showOtherTipps(match, team1, team2, this.viewContainerRef).subscribe(res => { });
  }

  ngOnDestroy() {
    if (this.timerSubscription != null) {
        this.timerSubscription.unsubscribe();
    }
  }

}