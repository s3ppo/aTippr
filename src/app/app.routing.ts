//Angular
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntroComponent } from './intro/intro.component';
import { RegisterComponent } from './register/register.component';
import { MembersComponent } from './members/members.component';
import { TippComponent } from './tipp/tipp.component';
import { TipperComponent } from './tipper/tipper.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTeamsComponent } from './admin/teams/teams.component';
import { AdminMembersComponent } from './admin/members/members.component';
import { AdminMatchesComponent } from './admin/matches/matches.component';
//Guards
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'intro', component: IntroComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
    { path: 'tipp', component: TippComponent, canActivate: [AuthGuard] },
    { path: 'tipp/tipper', component: TipperComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'admin/teams', component: AdminTeamsComponent, canActivate: [AdminGuard] },
    { path: 'admin/members', component: AdminMembersComponent, canActivate: [AdminGuard] },
    { path: 'admin/matches', component: AdminMatchesComponent, canActivate: [AdminGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);