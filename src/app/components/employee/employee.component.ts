import { Component, ViewChild, AfterViewInit, inject, OnInit, model, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { IEmployee } from '../../model/employee';
import { EmployeeService } from '../../services/employee/employee.service';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RoledialogComponent } from '../role/dialog/roledialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-employee',
  providers: [provideNativeDateAdapter()],
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, CommonModule, FormsModule, MatIconModule, MatCardModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  readonly role = signal('');
  readonly dialog = inject(MatDialog);

  openRoleDialog(): void {
    const dialogRef = this.dialog.open(RoledialogComponent, {
      data: { role: this.role() },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.role.set(result.role);
        this.employeeForm.patchValue({ role: result.role });
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  displayedColumns: string[] = ['empName', 'empId', 'empCode', 'empEmailId', 'actions'];
  showSearch = { empName: false, empId: false, empCode: false, empEmailId: false };
  filters = { empName: '', empId: '', empCode: '', empEmailId: '' };
  //dataSource = new MatTableDataSource<PeriodicElement>();
  dataSource = new MatTableDataSource<IEmployee>();
  employeeList: IEmployee[] = [];
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  employeeService = inject(EmployeeService);
  employeeForm: FormGroup;
  editingEmployee: IEmployee | null = null;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      empId: [null, Validators.required],
      empName: ['', Validators.required],
      role: ['', Validators.required],
      empDesignation: ['', Validators.required],
      empCode: ['', Validators.required],
      empDob: [null, Validators.required],
    });
  }

  ngOnInit() {

    //this.dataSource.data = ELEMENT_DATA;
    this.employeeService.getEmployees().subscribe((data) => { this.employeeList = data.data; this.dataSource.data = data.data; this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator; }, (error) => { console.log(error); alert('Error in fetching data'); });
  }

  toggleSearch(column: String) {
    const key = column as keyof typeof this.filters;
    this.showSearch[key] = !this.showSearch[key];
    // this.filters = {
    //   ...this.filters,
    //   [key]: typeof this.filters[key] === 'number' ? 0 : ''
    // };
    this.filters[key] = '';
    this.applyFilter();

  }
  applyFilter() {
    this.dataSource.data = this.employeeList.filter(item =>
      (this.filters.empId ? item.empId.toString().includes(this.filters.empId) : true) &&
      (this.filters.empName ? item.empName.toLowerCase().includes(this.filters.empName.toLowerCase()) : true) &&
      (this.filters.empCode ? item.empCode.toLowerCase().includes(this.filters.empCode.toLowerCase()) : true)
    );
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.editingEmployee) {
        console.log('Update existing employee');
        const updatedEmployee = this.employeeForm.value;
        this.dataSource.data = this.dataSource.data.map((emp) =>
          emp.empId === updatedEmployee.empId ? updatedEmployee : emp
        );
      } else {
        console.log('Adding new employee');
        const newEmployee = this.employeeForm.value;
        this.dataSource.data = [...this.dataSource.data, newEmployee];
      }

      this.resetForm();
    }
  }

  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue(employee);
    this.editingEmployee = employee;
  }

  resetForm() {
    this.employeeForm.reset();
    this.editingEmployee = null;
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
