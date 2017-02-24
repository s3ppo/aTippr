//Angular
import { Component } from '@angular/core';
//Material
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialog {

    public title: string;
    public message: string;

    constructor(
        public dialogRef: MdDialogRef<ConfirmDialog>
    ) {}

}
