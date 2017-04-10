//Angular
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material
import { MdDialogRef, MdDialog, Overlay, MdDialogConfig, MdSnackBar, MdIconRegistry } from '@angular/material';
//Services
import { MatchesService } from '../../services/matches.service';
import { CategoriesService } from '../../services/categories.service';
import { TeamsService } from '../../services/teams.service';
import { DialogsService } from '../../services/dialog.service';
//Models
import { MatchesModel, MatchesModelAll } from '../../models/matches';
import { CategoriesModel } from '../../models/categories';
import { TeamsModel } from '../../models/teams';

@Component({
  selector: 'AdminMatches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  providers: [MdIconRegistry],
})
export class AdminMatchesComponent implements OnInit{

  public dialogRef: MdDialogRef<AdminCategoryDialog>;
  public dialogRes: MdDialogRef<AdminMatchResultDialog>;
  public matchesmodel = new MatchesModel('', '', '', '', '', '', '', '', '');
  public matchesmodelAll: MatchesModel[];
  public matches_msg = ['', ''];
  public teamsmodelAll: TeamsModel[];
  public categoriesmodelAll: CategoriesModel[];
  public selCategory: String;

  constructor(
    public matchesService: MatchesService,
    public categoriesService: CategoriesService,
    public teamsService: TeamsService,
    public dialogsService: DialogsService, 
    public snackBar: MdSnackBar,
    public  dialog: MdDialog,
    public  viewContainerRef: ViewContainerRef,
    public mdIconRegistry: MdIconRegistry, 
    public sanitizer: DomSanitizer
  ){
    this.matchesmodel.multiplier = "1";
    mdIconRegistry.addSvgIcon('whistle', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/whistle.svg'));
  }

  doCreateMatch(): void {
    let matchstart: Date = new Date(this.matchesmodel.matchstart);
    let hours: number = parseInt(this.matchesmodel.matchstarttime.substring(0,2));
    let minutes: number = parseInt(this.matchesmodel.matchstarttime.substring(3));
    matchstart.setHours(hours, minutes);

    let deadline: Date = new Date(this.matchesmodel.deadline);
    let dhours = parseInt(this.matchesmodel.deadlinetime.substring(0,2));
    let dminutes = parseInt(this.matchesmodel.deadlinetime.substring(3));
    deadline.setHours(dhours, dminutes);

    let creatematch = new MatchesModelAll(this.matchesmodel.team1,this.matchesmodel.team2,this.matchesmodel.category,this.matchesmodel.matchlocation,matchstart.getTime(),deadline.getTime(),parseInt(this.matchesmodel.multiplier));
    this.matchesService.create(creatematch);

    this.snackBar.open('Neues Match wurde angelegt', 'Close', { duration: 2000 });
  }

  delMatch(match): void {
    this.dialogsService
      .confirm('Bitte Bestätigen', 'Löschen von diesem Match wirklich durchführen?', this.viewContainerRef)
      .subscribe(res =>   {   
        if(res === true) {
              this.matchesService.remove(match);
        }
      });
  }

  setResult(match: MatchesModelAll): void {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRes = this.dialog.open(AdminMatchResultDialog, config);
    this.dialogRes.componentInstance.matchesmodelview = match;

    this.dialogRes.afterClosed().subscribe(result => {
      if(result != null && result.result1 != null && result.result2 != null) {
        match.result1 = result.result1;
        match.result2 = result.result2;
        this.matchesService.setResult(match);
        this.snackBar.open('Matchergebnis eingetragen!', 'Close', { duration: 2000 } );
      }
      this.dialogRes = null;
    });
  }

  getAllMatches(): void {
    this.matchesService.getAllwithTeams().subscribe( matches => {
      this.matchesmodelAll = matches;
    });
  }

  getAllCategories(): void {
    this.categoriesService.getAll().subscribe( categories => this.categoriesmodelAll = categories );
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

  onCatChange(event): void {
    this.selCategory = event;
  }

  RemoveCategory(event): void {
    this.dialogsService
      .confirm('Bitte Bestätigen', 'Löschen dieser Kategorie wirklich durchführen?', this.viewContainerRef)
      .subscribe(res =>   {   
        if(res === true) {
          this.categoriesService.delete(this.selCategory);
        }
      });
  }

  openAddCategory(event): void {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(AdminCategoryDialog, config);
    this.dialogRef.afterClosed().subscribe(result => {
      if(result == 'ok'){
        this.snackBar.open('Neue Kategorie angelegt!', 'Close', { duration: 2000 } );
      }
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
    public categoriesService: CategoriesService,
  ){}

  public categorymodel = new CategoriesModel('');

  doCreateCategory(): void {
    this.categoriesService.create(this.categorymodel);
    this.dialogRef.close('ok');
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}

@Component({
  selector: 'result-dialog',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  providers: [],
})
export class AdminMatchResultDialog {

  constructor(
    public dialogRef: MdDialogRef<AdminMatchResultDialog>,
  ){}

  public matchesmodelview: MatchesModelAll;

  doCreateCategory(): void {
    this.dialogRef.close(this.matchesmodelview);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}