//Angular
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
//Models
import { MatchesModel } from '../../models/matches';
import { TippsModel } from '../../models/tipps';
import { MembersModel } from '../../models/members';
//Services
import { MatchesService } from '../../services/matches.service';
import { TippsService } from '../../services/tipps.service';
import { MembersService } from '../../services/members.service';

@Component({
  selector: 'Calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css'],
  providers: []
})
export class AdminCalculateComponent {

  private matchesmodelAll: MatchesModel[];
  private tippsmodelAll: TippsModel[];
  private membersmodelAll: MembersModel[];

  constructor(
    private matchesService: MatchesService,
    private tippsService: TippsService,
    private membersService: MembersService,
  ){}

  calc(): void {
    this.matchesService.getAll().subscribe( match => {
      this.matchesmodelAll = match;
      this.membersService.getAll().subscribe( member => {
        this.membersmodelAll = member;
        this.tippsService.getAllUsers(member.$key).subscribe( tipp => {
          this.tippsmodelAll = tipp;
        })
      })
    })
  }

}