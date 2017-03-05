//Angular
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material2
import { MdSnackBar } from '@angular/material';
//Models
import { RulesModel } from '../../models/rules';
//Services
import { RulesService } from '../../services/rules.service';

@Component({
  selector: 'AdminRules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css'],
  providers: [MdSnackBar]
})

export class AdminRulesComponent implements OnInit{

  constructor(
    private rulesService: RulesService,
    private snackBar: MdSnackBar,
  ){}

  private rulesmodel: RulesModel[];

  getRules(): void {
    this.rulesService.getAll().subscribe(rules => {
        this.rulesmodel = rules;
    })
  }

  changeRules(): void {
    this.snackBar.open('Rules successfully changed', 'Close', {duration:2000});
  }

  ngOnInit(): void {
    this.getRules();
  }

}