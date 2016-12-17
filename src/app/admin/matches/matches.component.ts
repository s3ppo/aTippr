//Angular
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material
import { MdDialogRef, MdDialog, Overlay, MdDialogConfig } from '@angular/material';
//Services
import { MatchesService } from '../../services/matches.service';
import { CategoriesService } from '../../services/categories.service';
import { TeamsService } from '../../services/teams.service';
//Models
import { MatchesModelUI, MatchesModel } from '../../models/matches';
import { CategoriesModel } from '../../models/categories';
import { TeamsModel } from '../../models/teams';

@Component({
  selector: 'Admin_Matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  providers: [],
})
export class AdminMatchesComponent implements OnInit{

  constructor(
    private matchesService: MatchesService,
    private categoriesService: CategoriesService,
    private teamsService: TeamsService,
    public  dialog: MdDialog,
    public  viewContainerRef: ViewContainerRef
  ){}

  private dialogRef: MdDialogRef<AdminCategoryDialog>;
  private matchesmodel = new MatchesModelUI('', '', '', '', '', '', '', '', '');
  private matchesmodelview: MatchesModel[];
  private matches_msg = ['', ''];
  private teamsmodelAll: TeamsModel[];
  private categoriesmodelAll: CategoriesModel[];

  doCreateMatch(): void {
    let postmatch = new MatchesModel(this.matchesmodel.team1,this.matchesmodel.team2,this.matchesmodel.category,this.matchesmodel.matchlocation,'','',parseInt(this.matchesmodel.multiplier));
    let matchdate: Date;
    let hours: number;
    let minutes: number;

    //Prepare Matchstart
    matchdate = new Date(this.matchesmodel.matchstart);
    hours = parseInt(this.matchesmodel.matchstarttime.substring(0,2));
    minutes = parseInt(this.matchesmodel.matchstarttime.substring(3));
    matchdate.setHours(hours,minutes);
    postmatch.matchstart = matchdate.toUTCString();
    //Prepare Deadline
    matchdate = new Date(this.matchesmodel.deadline);
    hours = parseInt(this.matchesmodel.deadlinetime.substring(0,2));
    minutes = parseInt(this.matchesmodel.deadlinetime.substring(3));
    matchdate.setHours(hours,minutes);
    postmatch.deadline = matchdate.toUTCString();

    let creatematchOperation:Observable<MatchesModelUI>;
    /*creatematchOperation = this.matchesService.create(postmatch);
    creatematchOperation.subscribe(
                            matches => { this.matchesmodel = new MatchesModelUI('', '', '', '', '', '', '', '', '');
                                         this.matches_msg[0] = 'success_msg';
                                         this.matches_msg[1] = 'Neues Match wurde erfolgreich angelegt.';
                                         this.getAllMatches(); },
                            err     => { this.matches_msg[0] = 'error_msg';
                                         this.matches_msg[1] = 'Neues Match konnte nicht angelegt werden.';
                                         this.getAllMatches(); });*/
  }

  getAllMatches(): void {
    /*this.matchesService.getAll()
                     .subscribe(
                            matches => { this.matchesmodelview = matches },
                            err     => { console.log(err) });*/
  }

  delMatch(match): void {
    /*this.matchesService.delete(match)
                         .subscribe(
                            matches => { this.matches_msg[0] = 'success_msg';
                                         this.matches_msg[1] = 'Match wurde erfolgreich gelöscht.'; 
                                         this.getAllMatches(); }, 
                            err     => { this.matches_msg[0] = 'error_msg';
                                         this.matches_msg[1] = 'Match konnte nicht gelöscht werden.'; });*/
  }

  setResult(match): void {
    
  }

  getAllCategories(): void {
    this.categoriesService.getAll()
        .subscribe( categories => this.categoriesmodelAll = categories );
  }

  getAllTeams(): void {
    this.teamsService.getAll()
        .subscribe( teams => this.teamsmodelAll = teams );
  }

  ngOnInit(): void {
    this.getAllMatches();
    this.getAllCategories();
    this.getAllTeams();
  }

  RemoveCategory(): void {
    /*this.categoriesService.get(this.matchesmodel.category)
                          .subscribe(
                              categories => { this.RemoveCategoryDo(categories) });*/
  }

  RemoveCategoryDo(categorydel): void {
    /*this.categoriesService.delete(categorydel)
                          .subscribe(
                              categories => { this.matches_msg[0] = 'success_msg';
                                              this.matches_msg[1] = 'Kategorie wurde erfolgreich gelöscht.'; 
                                              this.getAllCategories(); },
                              err        => { this.matches_msg[0] = 'error_msg';
                                              this.matches_msg[1] = 'Kategorie konnte nicht gelöscht werden.'; });*/
  }

  openAddCategory(): void {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(AdminCategoryDialog, config);

    this.dialogRef.afterClosed().subscribe(result => {
      if(result == 'ok'){
        this.matches_msg[0] = 'success_msg';
        this.matches_msg[1] = 'Neue Kategorie wurde erfolgreich angelegt.'
      } else if(result != null) {
        this.matches_msg[0] = 'error_msg';
        this.matches_msg[1] = 'Kategorie konnte nicht angelegt werden.';
      }
      this.getAllCategories();
      this.dialogRef = null;
    });
  }

}

@Component({
  selector: 'categories-dialog',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [],
})
export class AdminCategoryDialog {

  constructor(
    public dialogRef: MdDialogRef<AdminCategoryDialog>,
    private categoriesService: CategoriesService,
  ){}

  private categorymodel = new CategoriesModel('');

  doCreateCategory(): void {
    /*let createcategoryOperation:Observable<CategoriesModel>;
    createcategoryOperation = this.categoriesService.create(this.categorymodel);
    createcategoryOperation.subscribe(
                            categories => { this.categorymodel = new CategoriesModel('');
                                            this.dialogRef.close('ok') },
                            err =>   { this.dialogRef.close(err) });*/
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}