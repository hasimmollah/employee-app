export interface IEmployee {
    empId: number;
    empName: string;
    empEmailId: string;
    mobile: string;
    role: string;
    empDesignation: string;
    empCode: string;
    dob?: Date;  
}
export interface IEmployeeApiResponse {
    message: string;
    result: boolean;
    data: IEmployee[];
}