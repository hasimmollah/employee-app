import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RoleService } from '../../services/role/role.service';
import { IRole } from '../../model/role';
import { SpinnerComponent } from '../reusable/spinner/spinner.component';

@Component({
  selector: 'app-role',
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
  roleService = inject(RoleService);
  roleList : IRole[] = [];
  spinner:boolean = true;
  ngOnInit(): void {
     this.roleService.getRoles().subscribe((data) => { this.roleList = data.data; this.spinner = false; }, (error) => { console.log(error); alert('Error in fetching data'); this.spinner = false;});
  }

  

  

}


