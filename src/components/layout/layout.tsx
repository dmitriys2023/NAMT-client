// @ts-ignore
import {Outlet} from "react-router-dom";
import {Sidebar} from "../sidebar/sidebar";
import s from './s.module.scss'

export const Layout = () =>{
    return <div className={s.root}>
        <div>
            <Sidebar/>
        </div>
        <div className={s.page}>
            <Outlet/>
        </div>

    </div>
}