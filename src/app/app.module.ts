//Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//Routing
import { routing } from './app.routing';
//Backand
import { BackandService } from 'angular2bknd-sdk';
//Material
import { MaterialModule } from '@angular/material';
//Services
import { LoginService } from './services/login.service';
import { MembersService } from './services/members.service';
import { TeamsService } from './services/teams.service';
//Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntroComponent } from './intro/intro.component';
import { RegisterComponent } from './register/register.component';
import { MembersComponent } from './members/members.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTeamsComponent } from './admin/teams/teams.component';
import { AdminMembersComponent } from './admin/members/members.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    IntroComponent,
    RegisterComponent,
    MembersComponent,
    AdminComponent,
    AdminTeamsComponent,
    AdminMembersComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
  ],
  providers: [
    BackandService,
    LoginService,
    MembersService,
    TeamsService,
    AuthGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
