//@ts-nocheck
import {IAuth, IEmployment, IEmploymentCreate, IGroup, ISpecialisation, IStudentForm} from "../page/types";

export class Api{
    constructor(private path:string, private baseUrl = 'http://localhost:3000/') {}
        async get(path:string, param?: {[key: string]:string}){
            const queryParam = param ? '?'+ Object.entries(param)
                .map(el => {
                    return `${el[0]}=${el[1]}`
                })
                .join('&') : ''

            const request = await fetch(this.baseUrl+ path + queryParam)
            console.log(this.baseUrl+ path + queryParam)
            return await request.json()
        }
        async getGroup(path:string){
            const request = await fetch(this.baseUrl+path)

            return request.json()
        }
    async getSpec(path:string){
        const request = await fetch(this.baseUrl+path)

        return request.json()
    }
        async post(path: string, body:object){
            const request = await fetch(this.baseUrl+ path,{
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(body), method:'Post'})
            console.log(body)

            return await request.json()
        }
    async remove(path:string){

        const request = await fetch(this.baseUrl+ path,{method:'Delete'})
        return await request.json()
    }

}

export const api = new Api()

export const studentsApi = {
    path:'students/',
    async getAll<T>():Promise<T>{

        return await api.get(this.path)
    },
    async getByGroup<T>(obg:object):Promise<T>{
        return await api.get(this.path + 'group', obg)
    },

    async create(student: IStudentForm){
        return await api.post(this.path, student)
    },
    async del(id:string){
        return await api.remove(this.path + id)
    }
}

export const groupApi = {
    path: 'groups/',
    async getGroup<T>():Promise<T>{
        const group = api.getGroup(this.path)
        return await group
    },
    async create(group: IGroup){
        return await api.post(this.path, group)
    },
    async del(id:string){
        return await api.remove(this.path + id)
    }
}

export const specApi = {
    path: 'specialisations/',
    async getSpec<T>():Promise<T>{
        const spec = api.getSpec(this.path)
        return await spec
    },
    async create(spec: ISpecialisation){
        return await api.post(this.path, spec)
    },
    async del(id:string){
        return await api.remove(this.path + id)
    }

}

export const employmentApi = {
    path:'employment/',
    async getByStudID<T>(obj:object):Promise<T>{
        return await api.get(this.path + 'special', obj)
    },
    async del(id:string){
        return await api.remove(this.path + id)
    },
    async create(employment: IEmploymentCreate){
        console.log(employment)
        return await api.post(this.path, employment)
    },
}


export const reportApi = {
    path:'employment/',
    async getByStatus<T>(obj:object):Promise<T>{
        return await api.get(this.path + 'status', obj)
    },
}


