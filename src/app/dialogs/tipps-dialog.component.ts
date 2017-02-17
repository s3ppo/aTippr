//Angular
import { Component } from '@angular/core';
//Material
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'tipps-dialog',
    templateUrl: './tipps-dialog.component.html',
})
export class TippsDialog {

    public match: string;

    constructor(
        public dialogRef: MdDialogRef<TippsDialog>
    ) {}

}
