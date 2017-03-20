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
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MdSnackBar,
    private loginservice: LoginService,
  ){}
  
  private registermodel = new AccountsModel('','','','','','-Kf19Tht26iLL6I6rQnc');
  private createOwn: boolean = false;

  doRegister(): void {
    if(this.createOwn) {
      this.registermodel.gameid = '';
    }
    this.loginservice.createUser(this.registermodel, this.createOwn).then(data => { 
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