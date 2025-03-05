import { Injectable } from '@angular/core';
import { IEmployeeApiResponse } from '../../model/employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }
    getEmployees():Observable<IEmployeeApiResponse> {
      return this.httpClient.get<IEmployeeApiResponse>('https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllEmployee');
    }
}
