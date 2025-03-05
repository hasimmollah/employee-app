import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRoleApiResponse } from '../../model/role';
import { IDesignationApiResponse } from '../../model/designation';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(private httpClient: HttpClient) { }
    getDesignations():Observable<IDesignationApiResponse> {
      return this.httpClient.get<IDesignationApiResponse>('https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllDesignation');
    }
}
