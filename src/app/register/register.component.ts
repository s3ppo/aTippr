//Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Material
import { MdSnackBar } from '@angular/material';
//Models
import { AccountsModel } from '../models/accounts';
//Services
import { LoginService } from '../services/login.service';

@Component({
  selector: 'Register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MdSnackBar]
})
export class RegisterComponent implements OnInit{

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public snackBar: MdSnackBar,
    public loginservice: LoginService,
  ){}
  
  public registermodel = new AccountsModel('','','','','','-Kf19Tht26iLL6I6rQnc');
  public createOwn: boolean = false;
  public gameName: String;
  public publicGame: boolean = false;

  doRegister(): void {
    this.loginservice.createUser(this.registermodel, this.createOwn, this.gameName, this.publicGame).then(data => { 
      this.router.navigate(['/dashboard'])
    }, err  => {
      this.snackBar.open(err, 'Close')
    })
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if(params['newGame']) {
        this.createOwn = true;
      }
      if(params['gameid']) {
        this.registermodel.gameid = params['gameid'];
      }
    });
  }

}