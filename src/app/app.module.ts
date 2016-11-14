import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//Routing
import { routing } from './app.routing';
//Firebase
import { AngularFireModule, AuthMethods, AuthProviders } from "angularfire2";
//Material
import { MaterialModule } from '@angular/material';
//Services
import { LoginService } from './services/login.service';
//Guards
import { AuthGuard } from './guards/auth.guard';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const firebaseConfig = {
    apiKey: "AIzaSyALvAG2XzTCBvRCpi3sSz2GUDnMlhdFz8o",
    authDomain: "api-project-340883542890.firebaseapp.com",
    databaseURL: "https://api-project-340883542890.firebaseio.com",
    storageBucket: "api-project-340883542890.appspot.com",
    messagingSenderId: "340883542890"
  };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    routing,
  ],
  providers: [
    LoginService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
