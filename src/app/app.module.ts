//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//Routing
import { routing } from './app.routing';
//HammerJS
import 'hammerjs';
//Material
import { MaterialModule } from '@angular/material';
//AngularFire
import { AngularFireModule } from 'angularfire2';
//Services
import { LoginService } from './services/login.service';
import { MembersService } from './services/members.service';
import { TeamsService } from './services/teams.service';
import { MatchesService } from './services/matches.service';
import { CategoriesService } from './services/categories.service';
import { TippsService } from './services/tipps.service';
//Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntroComponent } from './intro/intro.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { MembersComponent } from './members/members.component';
import { TippComponent } from './tipp/tipp.component';
import { TipperComponent } from './tipper/tipper.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTeamsComponent } from './admin/teams/teams.component';
import { AdminMembersComponent } from './admin/members/members.component';
import { AdminMatchesComponent, AdminCategoryDialog } from './admin/matches/matches.component';
import { AdminCalculateComponent } from './admin/calculate/calculate.component';

  // Initialize Firebase
  var firebaseConfig = {
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
    IntroComponent,
    RegisterComponent,
    ForgotComponent,
    MembersComponent,
    TippComponent,
    TipperComponent,
    AdminComponent,
    AdminTeamsComponent,
    AdminMembersComponent,
    AdminMatchesComponent,
    AdminCategoryDialog,
    AdminCalculateComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    LoginService,
    MembersService,
    TeamsService,
    MatchesService,
    CategoriesService,
    TippsService,
    AuthGuard,
    AdminGuard,
  ],
  entryComponents: [
    AdminCategoryDialog,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
