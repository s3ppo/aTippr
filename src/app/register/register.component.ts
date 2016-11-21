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
    if(this.registermodel.password != this.registermodel.password2){
      this.snackBar.open('Passwords do not Match!', "Close");
      return;
    }

    this.loginservice.doRegister(this.registermodel)
        .then( success  => { this.registermodel = new AccountsModel('','','','','');
                             this.router.navigate(['/dashboard']); })
        .catch( error   => { this.snackBar.open(error, "Close") });
  }

}