import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { MdSnackBar } from '@angular/material';

import { LoginService } from '../services/login.service';
import { AccountsModel } from '../models/accounts';

@Component({
  selector: 'Register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MdSnackBar]
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private snackBar: MdSnackBar,
    private loginservice: LoginService,
  ){}
  
  registermodel = new AccountsModel('','','','','');

  doRegister(): void {
    this.loginservice.doRegister(this.registermodel)
        .subscribe( data =>   { this.registermodel = new AccountsModel('','','','','')},
                    error =>  { this.snackBar.open('Registrierung konnte nicht durchgeführt werden', 'Close') } );
  }

}