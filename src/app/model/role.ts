export interface IRole {
    roleId: number;
    role: string;
}
export interface IRoleApiResponse {
    message: string;
    result: boolean;
    data: IRole[];
}  
export interface IRoleDialogData {
    role: string;
}  