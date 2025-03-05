import { Component, inject, OnInit } from '@angular/core';
import { DesignationService } from '../../services/designation/designation.service';
import { IDesignation } from '../../model/designation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-designation',
  imports: [CommonModule],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {

    designationService = inject(DesignationService);
    designationList : IDesignation[] = [];
item: any;
    ngOnInit(): void {
       this.designationService.getDesignations().subscribe((data) => { this.designationList = data.data; }, (error) => { console.log(error); alert('Error in fetching data'); });
    }

}


