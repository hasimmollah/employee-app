import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRole, IRoleApiResponse } from '../../model/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }
  getRoles():Observable<IRoleApiResponse> {
    return this.httpClient.get<IRoleApiResponse>('https://freeapi.miniprojectideas.com/api/EmployeeApp/GetAllRoles');
  }
}
