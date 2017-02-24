//Angular
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material2
import { MdSnackBar } from '@angular/material';
//Models
import { NewsModel } from '../../models/news';
//Services
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'News',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [MdSnackBar]
})

export class AdminNewsComponent implements OnInit{

  constructor(
    private newsService: NewsService,
    private snackBar: MdSnackBar,
  ){}

  private newsmodel = new NewsModel('','',0);

  getNews(): void {
    this.newsService.getLast(1).subscribe(news => {
        this.newsmodel = news[0];
    })
  }

  changeNews(): void {
    this.newsService.update(this.newsmodel);
  }

  ngOnInit(): void {
    this.getNews();
  }

}