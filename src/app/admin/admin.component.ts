//Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Services
import { LoginService } from '../services/login.service';

@Component({
  selector: 'Admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: []
})
export class AdminComponent implements OnInit{

  private gameid: String;

  constructor(
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.loginService.userdata.subscribe( userdata => {
      this.gameid = userdata.gameid
    })
  }

}