import { WaiterCockpitService } from '../services/waiter-cockpit.service';
import { ReservationView } from '../../shared/view-models/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import {
  FilterCockpit,
  Pageable,
} from '../../shared/backend-models/interfaces';
import * as moment from 'moment';
import { ConfigService } from '../../core/config/config.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'cockpit-reservation-cockpit',
  templateUrl: './reservation-cockpit.component.html',
  styleUrls: ['./reservation-cockpit.component.scss'],
})
export class ReservationCockpitComponent implements OnInit {
  private sorting: any[] = [];

  pageable: Pageable = {
    pageSize: 8,
    pageNumber: 0,
    // total: 1,
  };

  @ViewChild('pagingBar', { static: true }) pagingBar: MatPaginator;

  reservations: ReservationView[] = [];
  totalReservations: number;

  columns: any[];
  displayedColumns: string[] = ['bookingDate', 'email', 'bookingToken'];

  pageSizes: number[];

  filters: FilterCockpit = {
    bookingDate: undefined,
    email: undefined,
    bookingToken: undefined,
  };

  constructor(
    private waiterCockpitService: WaiterCockpitService,
    private translocoService: TranslocoService,
    private dialog: MatDialog,
    private configService: ConfigService,
  ) {
    this.pageSizes = this.configService.getValues().pageSizes;
  }

  ngOnInit(): void {
    this.setTableHeaders();
    this.translocoService.langChanges$.subscribe((event: any) => {
      this.setTableHeaders();
      moment.locale(this.translocoService.getActiveLang());
    });
    this.applyFilters();
  }

  setTableHeaders(): void {
    this.translocoService.selectTranslate('cockpit.table').subscribe((res: any) => {
      this.columns = [
        { name: 'booking.bookingDate', label: res.reservationDateH },
        { name: 'booking.email', label: res.emailH },
        { name: 'booking.bookingToken', label: res.bookingTokenH },
      ];
    });
  }

  filter(): void {
    this.pageable.pageNumber = 0;
    this.applyFilters();
  }

  applyFilters(): void {
    this.waiterCockpitService
      .getReservations(this.pageable, this.sorting, this.filters)
      .subscribe((data: any) => {
        if (!data) {
          this.reservations = [];
        } else {
          this.reservations = data.content;
        }
        this.totalReservations = data.totalElements;
      });
  }

  clearFilters(filters: any): void {
    filters.reset();
    this.applyFilters();
    this.pagingBar.firstPage();
  }

  page(pagingEvent: PageEvent): void {
    this.pageable = {
      pageSize: pagingEvent.pageSize,
      pageNumber: pagingEvent.pageIndex,
      sort: this.pageable.sort,
      // total: 1,
    };
    this.applyFilters();
  }

  sort(sortEvent: Sort): void {
    this.sorting = [];
    if (sortEvent.direction) {
      this.sorting.push({
        property: sortEvent.active,
        direction: '' + sortEvent.direction,
      });
    }
    this.applyFilters();
  }

  selected(selection: ReservationView): void {
    this.dialog.open(ReservationDialogComponent, {
      width: '80%',
      data: selection,
    });
  }
}
