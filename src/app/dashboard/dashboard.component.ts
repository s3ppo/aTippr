//Angular
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
  public name: String;

  constructor(
    private loginservice: LoginService,
  ){}

  ngOnInit(): void {
    this.name = this.loginservice.self['name'];
  }

}