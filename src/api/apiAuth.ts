//@ts-nocheck
import axios from "axios";
import {IAuth} from "../page/types";

const instance = axios.create({
    baseURL:'http://localhost:3000/'
})

export const UserApi = {
    async login(dto:IAuth){
        const {data}  = await instance.post('auth/login', dto)
        return  data
    }
}