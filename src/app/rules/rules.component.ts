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
    public rulesService: RulesService,
    public snackBar: MdSnackBar,
  ){}

  public rulesmodel: RulesModel[];

  getRules(): void {
    this.rulesService.getAll().subscribe(rules => {
      this.rulesmodel = [];
      rules.forEach(rule => {
        if(rule.active == true) {
          this.rulesmodel.push(rule);
        }
      })
    })
  }

  ngOnInit(): void {
    this.getRules();
  }

}