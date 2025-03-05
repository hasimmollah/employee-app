import { Component } from '@angular/core';
import { DesignationComponent } from '../designation/designation.component';
import { RoleComponent } from '../role/role.component';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  imports: [DesignationComponent, RoleComponent, CommonModule,MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentComponent: String = 'role';
  roleComponentButtonClass: String = 'btn-success';

  showComponent(componentName: String) {
    this.currentComponent = componentName;
  }



}
