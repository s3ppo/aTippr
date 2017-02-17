//Angular
import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
//Material
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
//Components
import { ConfirmDialog } from '../dialogs/confirm-dialog.component';
import { TippsDialog } from '../dialogs/tipps-dialog.component';

@Injectable()
export class DialogsService {

    constructor(
        private dialog: MdDialog
    ){}

    public confirm(title: string, message: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmDialog>;
        let config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(ConfirmDialog, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }


    public showOtherTipps(match: string, viewContainerRef: ViewContainerRef): Observable<boolean> {

        let dialogRef: MdDialogRef<TippsDialog>;
        let config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(TippsDialog, config);

        dialogRef.componentInstance.match = match;

        return dialogRef.afterClosed();
    }

}