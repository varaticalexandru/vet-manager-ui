import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  merge,
  startWith,
  switchMap,
  catchError,
  map,
  of,
  Observable,
  debounceTime,
} from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppointmentService } from '../../service/appointment.service';
import { Appointment } from '../../../../commons/model/appointment.model';
import { PaginatedResponse } from '../../model/paginated-response.model';
import { emptyPaginatedResponse } from '../../../../commons/utils/paginated-response.utils';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentEditComponent } from '../../appointment-edit/appointment-edit.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {
  page_size = 2;

  @Input() displayedColumns: Array<string> = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data: Appointment[] = [];
  resultsLength = 0;
  isLoadingResults = true;

  petNameFilter = new FormControl('');
  doctorFirstNameFilter = new FormControl('');
  doctorLastNameFilter = new FormControl('');
  statusFilter = new FormControl('');
  dateFilter = new FormControl('');
  diagnosticFilter = new FormControl('');
  totalCostFilter = new FormControl('');

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.petNameFilter.valueChanges.pipe(debounceTime(200)),
      this.doctorFirstNameFilter.valueChanges.pipe(debounceTime(200)),
      this.doctorLastNameFilter.valueChanges.pipe(debounceTime(200)),
      this.statusFilter.valueChanges.pipe(debounceTime(200)),
      this.dateFilter.valueChanges.pipe(debounceTime(200)),
      this.diagnosticFilter.valueChanges.pipe(debounceTime(200)),
      this.totalCostFilter.valueChanges.pipe(debounceTime(200))
    )
      .pipe(
        startWith({}),
        switchMap((): Observable<PaginatedResponse> => {
          this.isLoadingResults = true;

          return this.appointmentService
            .fetchAppointmentsByPageable(
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.page_size, // alt: this.paginator.pageSize
              this.petNameFilter.value,
              this.doctorFirstNameFilter.value,
              this.doctorLastNameFilter.value,
              this.statusFilter.value,
              this.dateFilter.value
                ? new Date(this.dateFilter.value).toISOString()
                : null,
              this.diagnosticFilter.value,
              this.totalCostFilter.value
                ? parseFloat(this.totalCostFilter.value)
                : null
            )
            .pipe(catchError(() => of(emptyPaginatedResponse())));
        }),
        map((data: PaginatedResponse) => {

          this.isLoadingResults = false;

          if (data.empty) {
            return [];
          }

          this.resultsLength = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data: Appointment[]) => (this.data = data));
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  goToAppointment(appointment: Appointment) {
    const dialogRef = this.dialog.open(AppointmentEditComponent, {
      maxWidth: '1200',
      maxHeight: '800',
      data: appointment
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.appointmentService.updateAppointment(appointment.id, result).subscribe(() => {
          this.refreshTable();
        });
      }
    });
  }

  refreshTable() {
    
    this.isLoadingResults = true;
    this.appointmentService
      .fetchAppointmentsByPageable(
        this.sort.active,
        this.sort.direction,
        this.paginator.pageIndex,
        this.page_size,
        this.petNameFilter.value,
        this.doctorFirstNameFilter.value,
        this.doctorLastNameFilter.value,
        this.statusFilter.value,
        this.dateFilter.value
          ? new Date(this.dateFilter.value).toISOString()
          : null,
        this.diagnosticFilter.value,
        this.totalCostFilter.value
          ? parseFloat(this.totalCostFilter.value)
          : null
      )
      .pipe(catchError(() => of(emptyPaginatedResponse())))
      .subscribe((data: PaginatedResponse) => {
        this.isLoadingResults = false;
        this.resultsLength = data.totalElements;
        this.data = data.content;
      });
  }

  deleteAppointment(appointment: any) {}
}
