import { Component, inject } from '@angular/core';
import { ManagementToolComponent } from '../../components/management-tool/management-tool.component';
import { ListItemsComponent } from '../../components/list-items/list-items.component';
import { BaseInputComponent } from 'app/shared/components/base-input/base-input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseButtonComponent } from 'app/shared/components/base-button/base-button.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { DataItemsService } from '../../services/data-items.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    ManagementToolComponent,
    ListItemsComponent,
    BaseInputComponent,
    BaseButtonComponent,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private dataItemsService = inject(DataItemsService);

  private fb = inject(FormBuilder);

  constructor() {}
  urlForm = this.fb.group({
    url: [
      null,
      [
        Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i),
        Validators.required,
      ],
    ],
  });
  errorMessages = {
    pattern: 'Invalid URL',
    required: 'The name field is required',
  };

  setUrl() {
    if (this.urlForm?.valid) {
      let val = this.urlForm?.value?.url ? this.urlForm.value.url : '';
      this.dataItemsService.setApiUrl(val);
    }
  }
}
