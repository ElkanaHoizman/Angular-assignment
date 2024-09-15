import { Component, Inject, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseButtonComponent } from 'app/shared/components/base-button/base-button.component';
import { BaseInputComponent } from 'app/shared/components/base-input/base-input.component';
import { DatePipe, NgIf, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ItemDialog } from '../../models/item';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    BaseInputComponent,
    BaseButtonComponent,
    NgOptimizedImage,
  ],
  providers: [DatePipe],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss',
})
export class ItemFormComponent {
  itemForm: FormGroup;
  private fb = inject(FormBuilder);

  private datePipe = inject(DatePipe);
  private dialogRef!: MatDialogRef<ItemFormComponent>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ItemDialog) {
    this.itemForm = this.fb.group({
      id: [data?.id ? data.id : Math.floor(Math.random() * 100)],
      name: [data?.name ? data.name : null, Validators.required],
      color: [data?.color ? data.color : '#007AF9'],
      createDate: [
        {
          value: data?.createDate
            ? data.createDate
            : this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
          disabled: false,
        },
      ],
      createdBy: [data?.createdBy ? data.createdBy : null, Validators.required],
      lastUpdate: [
        {
          value: data?.createdBy
            ? data.createdBy
            : this.datePipe.transform(new Date(), 'dd/MM/yyyy'),
          disabled: false,
        },
      ],
      isEdit: [data?.isEdit ? data.isEdit : false],
    });
  }

  onSave() {
    if (this.itemForm.valid) {
      // Close the dialog and pass the form data
      this.dialogRef.close(this.itemForm.getRawValue());
    }
  }
}
