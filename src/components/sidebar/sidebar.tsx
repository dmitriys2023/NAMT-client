//@ts-nocheck
import {Link, NavLink} from "react-router-dom";
import s from './s.module.scss'
import {useState} from "react";
import {ModalWindow} from "../modal/Modal";
export const Sidebar = () =>{
    const [act, setAct] = useState(0)

    return <div className={s.side}>
        <div className={s.logo}>НАМТ | Занятость</div>

        <div className={s.root}>
            <div className={s.links}>
                <NavLink to={'student'} style={({ isActive }) => {
                    return {
                        backgroundColor: isActive ? "rgba(89, 89, 89, 0.24)" : ""
                    };
                }}>Студенты </NavLink>
                <NavLink to={'employment'} className={"s.nav-link-selected"} style={({ isActive }) => {
                    return {
                        backgroundColor: isActive ? "rgba(89, 89, 89, 0.24)" : ""
                    };
                }}>Занятость</NavLink>

                <NavLink to={'report'} className={"s.nav-link-selected"} style={({ isActive }) => {
                    return {
                        backgroundColor: isActive ? "rgba(89, 89, 89, 0.24)" : ""
                    };
                }}>Отчеты</NavLink>

                <NavLink to={'other'} className={"s.nav-link-selected"} style={({ isActive }) => {
                    return {
                        backgroundColor: isActive ? "rgba(89, 89, 89, 0.24)" : ""
                    };
                }}>Прочее</NavLink>

            </div>
            <div className={s.main}></div>
            <div className={s.footer}>#диплом</div>
        </div>
    </div>

}