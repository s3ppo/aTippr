//Angular
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RankingComponent } from './ranking/ranking.component';
import { IntroComponent } from './intro/intro.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { MembersComponent } from './members/members.component';
import { TippComponent } from './tipp/tipp.component';
import { TipperComponent } from './tipper/tipper.component';
import { ProfileComponent } from './profile/profile.component';
import { RulesComponent } from './rules/rules.component';
import { AdminComponent } from './admin/admin.component';
import { AdminTeamsComponent } from './admin/teams/teams.component';
import { AdminMembersComponent } from './admin/members/members.component';
import { AdminMatchesComponent } from './admin/matches/matches.component';
import { AdminCalculateComponent } from './admin/calculate/calculate.component';
import { AdminNewsComponent } from './admin/news/news.component';
//Guards
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'intro', component: IntroComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot', component: ForgotComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'rules', component: RulesComponent, canActivate: [AuthGuard] },
    { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
    { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
    { path: 'tipp', component: TippComponent, canActivate: [AuthGuard] },
    { path: 'tipp/tipper', component: TipperComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'admin/teams', component: AdminTeamsComponent, canActivate: [AdminGuard] },
    { path: 'admin/members', component: AdminMembersComponent, canActivate: [AdminGuard] },
    { path: 'admin/matches', component: AdminMatchesComponent, canActivate: [AdminGuard] },
    { path: 'admin/calculate', component: AdminCalculateComponent, canActivate: [AdminGuard] },
    { path: 'admin/news', component: AdminNewsComponent, canActivate: [AdminGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);