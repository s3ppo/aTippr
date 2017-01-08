//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
export class RegisterComponent {

  constructor(
    private router: Router,
    private snackBar: MdSnackBar,
    private loginservice: LoginService,
  ){}
  
  registermodel = new AccountsModel('','','','','');

  doRegister(): void {
    this.loginservice.createUser(this.registermodel)
        .then(data => { this.router.navigate(['/dashboard']) },
              err  => { this.snackBar.open(err, 'Close') });
  }

}