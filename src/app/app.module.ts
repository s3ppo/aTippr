import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//Firebase
import { AngularFireModule, AuthMethods, AuthProviders } from "angularfire2";
//Material
import { MaterialModule } from '@angular/material';
//Components
import { AppComponent } from './app.component';


const firebaseConfig = {
    apiKey: "AIzaSyALvAG2XzTCBvRCpi3sSz2GUDnMlhdFz8o",
    authDomain: "api-project-340883542890.firebaseapp.com",
    databaseURL: "https://api-project-340883542890.firebaseio.com",
    storageBucket: "api-project-340883542890.appspot.com",
    messagingSenderId: "340883542890"
  };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig,{
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
