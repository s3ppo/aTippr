import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { LoginService } from '../services/login.service';
import { AccountsModel } from '../models/accounts';

@Component({
  selector: 'Register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: []
})
export class RegisterComponent {

  constructor(
    private loginservice: LoginService,
  ){}
  
  registermodel = new AccountsModel('','','','','','','');

  doRegister(): void {
    if(this.registermodel.password != this.registermodel.password2){
      return;
    }

    this.loginservice.doRegister(this.registermodel);
  }

}