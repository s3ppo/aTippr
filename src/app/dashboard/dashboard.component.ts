import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Services
import { LoginService } from '../services/login.service';

@Component({
  selector: 'Dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: []
})
export class DashboardComponent implements OnInit{
  private username: String;

  constructor(
    private loginservice: LoginService,
  ){}

  ngOnInit(): void {
    let user = {};
    user = this.loginservice.getUser();
    this.username = user['displayName'];
  }


}