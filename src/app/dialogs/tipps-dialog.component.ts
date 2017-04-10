//Angular
import { Component, OnInit } from '@angular/core';
//Material
import { MdDialogRef } from '@angular/material';
//Models
import { OpenTippsModel } from '../models/opentipps'
//Services
import { TippsService } from '../services/tipps.service';

@Component({
    selector: 'tipps-dialog',
    templateUrl: './tipps-dialog.component.html',
    styleUrls: ['./tipps-dialog.component.css'],
})
export class TippsDialog implements OnInit{

    public match: String;
    public team1: String;
    public team2: String;
    public openTipps = [];

    constructor(
        public dialogRef: MdDialogRef<TippsDialog>,
        public tippsService: TippsService,
    ) {}

    getOpenTipps(): void {
        if(this.match) {
            this.tippsService.getOpenTippsSecure(this.match).subscribe(secured => {
                this.openTipps = secured;
                this.openTipps.forEach(line => {
                    line.tipp1 = line[Object.keys(line)[0]].tipp1;
                    line.tipp2 = line[Object.keys(line)[0]].tipp2;
                })
            }, error => {
                this.tippsService.getOpenTipps(this.match).subscribe(publ => {
                    this.openTipps = publ;
                })
            })
        }
    }

    ngOnInit() {
        this.getOpenTipps();
    }

}
