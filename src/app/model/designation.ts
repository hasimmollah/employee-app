export interface IDesignation {
    designationId: number;
    designation: string;
}
export interface IDesignationApiResponse {
    message: string;
    result: boolean;
    data: IDesignation[];
}    