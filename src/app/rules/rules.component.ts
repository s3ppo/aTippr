//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material2
import { MdSnackBar } from '@angular/material';
//Models
import { RulesModel } from '../models/rules';
//Services
import { RulesService } from '../services/rules.service';

@Component({
  selector: 'Rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

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

  ngOnInit(): void {
    this.getRules();
  }

}