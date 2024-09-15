import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ManagementToolService } from '../../services/management-tool.service';
import { DisplayTypes } from '../../enums/display-types.enum';

@Component({
  selector: 'app-management-tool',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './management-tool.component.html',
  styleUrl: './management-tool.component.scss',
})
export class ManagementToolComponent {
  managementToolService = inject(ManagementToolService);
  displayTypes = DisplayTypes;

  layoutChange(type: string) {
    this.managementToolService.setDisplayType(type);
  }

  addItem() {
    this.managementToolService.openFormDialog(null);
  }
}
