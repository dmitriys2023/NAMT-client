//@ts-nocheck
import s from './s.module.scss'
import {OtherGroup} from "./otherGroup";
import {OtherSpecialisation} from "./otherSpecialisation";
import React, {useState} from "react";
import {Button, ButtonGroup} from "@mui/material";
export const OtherPage = () => {
    const [pick, setPick] = useState(1)

    return <div>
        <h2 className={s.title}>Редактор таблиц</h2>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={()=>{
                setPick(1)
            }}>Группы</Button>
            <Button onClick={()=>{
                setPick(2)
            }}>Специальности</Button>
        </ButtonGroup>
        <div className={s.root}>
            {pick == 1 && <OtherGroup/>}
            {pick == 2 && <OtherSpecialisation/>}
        </div>
    </div>

}