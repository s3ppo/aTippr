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
    private openTipps = [];

    constructor(
        public dialogRef: MdDialogRef<TippsDialog>,
        private tippsService: TippsService,
    ) {}

    getOpenTipps(): void {
        if(this.match) {
            this.tippsService.getOpenTipps(this.match).subscribe(openTipps => {
                this.openTipps = openTipps;
            });
        }
    }

    ngOnInit() {
        this.getOpenTipps();
    }

}
