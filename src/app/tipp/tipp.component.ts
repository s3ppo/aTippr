//Angular
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material
import { MdIconRegistry } from '@angular/material';
//Models
import { CategoriesModel } from '../models/categories';
//Services
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'Tipp',
  templateUrl: './tipp.component.html',
  styleUrls: ['./tipp.component.css'],
  providers: [MdIconRegistry]
})
export class TippComponent implements OnInit{

  public categoriesModelAll = [];
  public loaded: boolean;

  constructor(
    public router: Router,
    public categoriesService: CategoriesService,
    public mdIconRegistry: MdIconRegistry, 
    public sanitizer: DomSanitizer
  ){
    mdIconRegistry.addSvgIcon('ball', sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/soccer.svg'));
  }

  getAllCategories(): void {
    this.categoriesService.getAll()
                     .subscribe(
                            matches =>  { this.categoriesModelAll = matches;
                                          this.loaded = true; },
                            err =>      { console.log(err) } );
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

}