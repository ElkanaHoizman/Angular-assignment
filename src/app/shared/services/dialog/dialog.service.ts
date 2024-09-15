import { inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { Observable } from 'rxjs';
import { DialogData } from 'app/shared/models/dialogData';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly dialog = inject(MatDialog);
  public dialogClosed!: Observable<boolean>;
  openDialog(dialog: DialogData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',
      enterAnimationDuration: dialog?.enterAnimationDuration || '0ms',
      exitAnimationDuration: dialog?.exitAnimationDuration || '0ms',
      data: {
        title: dialog?.data?.title || '' ,
        massage: dialog?.data?.massage || '',
        No: dialog?.data?.No,
        Ok: dialog?.data?.Ok || '',
      },
      panelClass: dialog?.className,
    });
    this.dialogClosed = dialogRef.afterClosed();
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
}
