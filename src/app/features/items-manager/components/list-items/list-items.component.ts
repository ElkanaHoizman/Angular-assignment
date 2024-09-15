import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { SearchPipe } from 'app/shared/pipes/search.pipe';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Item } from '../../models/item';
import { BaseInputComponent } from 'app/shared/components/base-input/base-input.component';
import { AsyncPipe, DatePipe, NgIf, NgStyle } from '@angular/common';
import { AddSpaceBeforeCapitalPipe } from 'app/shared/pipes/add-space-before-capital.pipe';
import { ManagementToolService } from '../../services/management-tool.service';
import { Observable, Subscription } from 'rxjs';
import { DataItemsService } from '../../services/data-items.service';

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [
    MatTableModule,
    MatTable,
    MatTableModule,
    SearchPipe,
    BaseInputComponent,
    DatePipe,
    MatSortModule,
    MatIconModule,
    AddSpaceBeforeCapitalPipe,
    NgStyle,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.scss',
})
export class ListItemsComponent implements AfterViewInit, OnDestroy {
  managementToolService = inject(ManagementToolService);
  private _liveAnnouncer = inject(LiveAnnouncer);
  displayType$ = inject(ManagementToolService).displayType;
  dataItemsService = inject(DataItemsService);
  items$: Observable<Item[]> = this.dataItemsService.getItems();
  subscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('filter', { static: false }) filter!: ElementRef;

  displayedColumns: string[] = [
    'color',
    'name',
    'createDate',
    'lastUpdate',
    'createdBy',
    'actions',
  ];
  dataSource: Item[] | any;

  ngAfterViewInit(): void {
    this.dataItemsService.getDate();
    this.subscription = this.items$.subscribe((data) => {
      if (this.isItemType(data[0])) {
        this.dataSource = new MatTableDataSource(data);
      } else {
        this.dataSource = null;
      }

      setTimeout(() => {
        this.dataSource.sort = this.sort;
      });
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getSortActionName(name: string) {
    return `Sort by ${name}`;
  }
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editItem(element: Item) {
    this.managementToolService.openFormDialog(element, true);
  }
  deletetem(element: Item) {
    this.dataItemsService.removeItem(element.id);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
  isItemType(obj: any): obj is Item {
    return (
      typeof obj === 'object' &&
      'id' in obj &&
      typeof obj.id === 'number' &&
      'color' in obj &&
      typeof obj.color === 'string' &&
      'name' in obj &&
      typeof obj.name === 'string' &&
      'createDate' in obj &&
      typeof obj.createDate === 'string'
    );
  }
}
