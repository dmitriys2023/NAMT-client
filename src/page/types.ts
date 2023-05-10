export interface IStudent {
    id: number;
    last_name: string;
    first_name: string;
    patronymic: string;
    phone: string;
    parents_phone: string;
    groups?:{
        id?:number;
        title?:string;
    };
    specialisations?:{
        id?:number;
        title?:string;
    };
}
export interface IEmployment{
    id: number,
    title_org: string,
    profession: string,
    by_speciality: string,
    status:string,
    students?: {
        id: number,
        last_name: string,
        first_name: string,
        patronymic: string,
        phone: string,
        parents_phone: string
    }
}
export interface IEmploymentCreate{
    id: number,
    title_org: string,
    profession: string,
    by_speciality: string,
    student_id:number;
    status:string;
}

export interface IAuth{
    login:string
    password:string
}
export interface IStudentForm extends Omit<IStudent, 'id'>{}
export interface IReportStatus extends Omit<IEmployment, 'id'>{}
export interface IReportStatusFrom{
    status:string
}
export interface IStudentEmployment extends Omit<IStudent, 'phone'|'parents_phone'>{}
export interface IGroup{
    id:number;
    title:string;
}

export interface ISpecialisation extends IGroup {}