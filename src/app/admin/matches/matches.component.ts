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
import { MatchesModel, MatchesModelAll } from '../../models/matches';
import { CategoriesModel } from '../../models/categories';
import { TeamsModel } from '../../models/teams';

@Component({
  selector: 'Admin_Matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  providers: [],
})
export class AdminMatchesComponent implements OnInit{

  private dialogRef: MdDialogRef<AdminCategoryDialog>;
  private matchesmodel = new MatchesModel('', '', '', '', '', '', '', '', '');
  private matchesmodelAll: MatchesModel[];
  private matches_msg = ['', ''];
  private teamsmodelAll: TeamsModel[];
  private categoriesmodelAll: CategoriesModel[];
  private selCategory: String;

  constructor(
    private matchesService: MatchesService,
    private categoriesService: CategoriesService,
    private teamsService: TeamsService,
    public  dialog: MdDialog,
    public  viewContainerRef: ViewContainerRef
  ){
    this.matchesmodel.multiplier = "1";
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

    let creatematch = new MatchesModelAll(this.matchesmodel.team1,this.matchesmodel.team2,this.matchesmodel.category,this.matchesmodel.matchlocation,matchstart.toUTCString(),deadline.toUTCString(),parseInt(this.matchesmodel.multiplier));
    this.matchesService.create(creatematch);
  }

  delMatch(match): void {
    this.matchesService.remove(match);
  }

  setResult(match): void {
    
  }

  getAllMatches(): void {
    this.matchesService.getAll()
        .subscribe( matches => this.matchesmodelAll = matches );
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

  onCatChange(event): void {
    this.selCategory = event;
  }

  RemoveCategory(value): void {
    this.categoriesService.delete(this.selCategory);
  }

  openAddCategory(): void {
    let config = new MdDialogConfig();
    config.viewContainerRef = this.viewContainerRef;

    this.dialogRef = this.dialog.open(AdminCategoryDialog, config);

    this.dialogRef.afterClosed().subscribe(result => {
      if(result == 'ok'){
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
    private categoriesService: CategoriesService,
  ){}

  private categorymodel = new CategoriesModel('');

  doCreateCategory(): void {
    this.categoriesService.create(this.categorymodel);
    this.dialogRef.close('ok');
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}