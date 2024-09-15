import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DisplayTypes } from '../enums/display-types.enum';
import { ItemFormComponent } from '../components/item-form/item-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Item, ItemDialog } from '../models/item';
import { DataItemsService } from './data-items.service';

@Injectable({
  providedIn: 'root',
})
export class ManagementToolService {
  public displayType: BehaviorSubject<string> = new BehaviorSubject<string>(
    DisplayTypes.List
  );

  readonly dialog = inject(MatDialog);
  public dialogClosed!: Observable<boolean>;
  private dataItemsService = inject(DataItemsService);

  setDisplayType(type: string) {
    this.displayType.next(type);
  }

  openFormDialog(element: Item | null, isEdit = false): void {
    document.documentElement.classList.add('modal-open');
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '767px',
      height: '100vh',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: '0ms',
      panelClass: 'custom-dialog-container',
      data: {
        id: element?.id ? element.id : null,
        color: element?.color ? element.color : '',
        name: element?.name ? element.name : '',
        createDate: element?.createDate ? element.createDate : '',
        lastUpdate: element?.lastUpdate ? element.lastUpdate : '',
        createdBy: element?.createdBy ? element.createdBy : '',
        isEdit: isEdit ? isEdit : false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      document.documentElement.classList.remove('modal-open');
      if (result) {
        const item: ItemDialog = {
          id: result.id,
          color: result.color,
          name: result.name,
          createDate: result.createDate ? result.createDate : result.createDate,
          lastUpdate: result.lastUpdate,
          createdBy: result.createdBy,
          isEdit: result.isEdit,
        };

        if (result.isEdit) {
          this.dataItemsService.updateExistingItem(item);
        } else {
          this.dataItemsService.addNewItem(item);
        }
      }
    });
  }
}
