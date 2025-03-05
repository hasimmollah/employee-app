import { Component, inject, model, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IRole, IRoleDialogData } from '../../../model/role';
import { RoleService } from '../../../services/role/role.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-roledialog',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatTableModule, MatSortModule, MatPaginatorModule, CommonModule,
    MatIconModule, MatCardModule,
    ReactiveFormsModule,
    MatRadioModule,
  ],
  templateUrl: './roledialog.component.html',
  styleUrl: './roledialog.component.css'
})
export class RoledialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<RoledialogComponent>);
  readonly data = inject<IRoleDialogData>(MAT_DIALOG_DATA);
  readonly role = model(this.data.role);
  displayedColumns: string[] = ['actions', 'roleId', 'roleName'];
  showSearch = { roleId: false, roleName: false };
  filters = { roleId: 0, roleName: '' };
  //dataSource = new MatTableDataSource<PeriodicElement>();
  dataSource = new MatTableDataSource<IRole>();
  roleList: IRole[] = [];
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  roleService = inject(RoleService);
  curRole: IRole | null = null;

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendData(): IRoleDialogData {
    return { role: this.curRole ? this.curRole.role : '' };;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit() {

    //this.dataSource.data = ELEMENT_DATA;
    this.roleService.getRoles().subscribe((data) => { this.roleList = data.data; this.dataSource.data = data.data; this.dataSource.sort = this.sort; this.dataSource.paginator = this.paginator; }, (error) => { console.log(error); alert('Error in fetching data'); });
  }

  toggleSearch(column: String) {
    const key = column as keyof typeof this.filters;
    this.showSearch[key] = !this.showSearch[key];
    this.filters = {
      ...this.filters,
      [key]: typeof this.filters[key] === 'number' ? 0 : ''
    };
    //this.filters[key] = '';
    this.applyFilter();

  }
  applyFilter() {
    this.dataSource.data = this.roleList.filter(item =>
      (this.filters.roleName ? item.role.toString().includes(this.filters.roleName) : true) &&
      (this.filters.roleId ? (item.roleId == this.filters.roleId) : true)
    );
  }

  selectRole(role: IRole) {
    this.curRole = role;
  }

  resetForm() {

  }
}

