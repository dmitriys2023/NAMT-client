//@ts-nocheck
import s from './s.module.scss'
import {Button, FormControl, FormControlLabel, FormLabel, RadioGroup, TextField, Radio} from "@mui/material";
import {useForm} from "react-hook-form";
import {IStudentForm} from "../types";
import React, {useState} from "react";
export const EmploymentAdd = () =>{

    const {register, handleSubmit} = useForm<IStudentForm>()
    const [radio, setRadio] = useState(0)

    return <>
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label"><p className={s.question}>Студент трудоустроен?</p> </FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                row
            >
                <FormControlLabel value="Да" control={<Radio />} label="Да" onClick={()=>setRadio(1)}/>
                <FormControlLabel value="Нет" control={<Radio />} label="Нет" onClick={()=>setRadio(2)}/>
                <FormControlLabel value="Продолжил обучение" control={<Radio />} label="Продолжил обучение" onClick={()=>setRadio(3)}/>
            </RadioGroup>

        </FormControl>
        {radio==1 && <>
            <p className={s.subtitle}>Добавить занятость для выбранного студента:</p>
            <TextField id="outlined-basic" {...register('title_org')} label="Название организации" variant="outlined"/>
            <TextField id="outlined-basic" {...register('profession')} label="Профессия студента" variant="outlined" />
            <p className={s.question2}>По профессии?</p>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                row
            >
                <FormControlLabel value="Да" control={<Radio />} label="Да" />
                <FormControlLabel value="Нет" control={<Radio />} label="Нет" />
            </RadioGroup>
            <Button type="submit" variant="outlined">Добавить информацию</Button>
            <TextField id="outlined-basic" {...register('status')} label="Профессия студента" variant="outlined" value="Трудоустроен"/>
        </>}
        {radio==2 && <>
            <p className={s.subtitle}>Добавить статус:</p>
            <Button type="submit" variant="outlined" color="error">Добавить статус не трудоустроен</Button>
            <TextField id="outlined-basic" {...register('title_org')} label="Название организации" value="-" variant="outlined" className={s.novis}/>
            <TextField id="outlined-basic" {...register('profession')} label="Профессия студента" value="-" variant="outlined" className={s.novis}/>
            <TextField id="outlined-basic" {...register('by_speciality')} label="По " value="-" variant="outlined" className={s.novis}/>
            <TextField id="outlined-basic" {...register('status')} label="Профессия студента" variant="outlined" value="Не работает"/>

        </>}
        {radio==3 && <>
            <p className={s.subtitle}>Добавить учебное заведение для выбранного студента:</p>
            <TextField id="outlined-basic" {...register('title_org')} label="Название организации" variant="outlined"/>
            <TextField id="outlined-basic" {...register('profession')} label="Направление" variant="outlined" />
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                row
            >
                <FormControlLabel value="Да" control={<Radio />} label="Да" />
                <FormControlLabel value="Нет" control={<Radio />} label="Нет" />
            </RadioGroup>
            <Button type="submit" variant="outlined">Добавить информацию</Button>
            <TextField id="outlined-basic" {...register('status')} label="Профессия студента" variant="outlined" value="Учится"/>
        </>}

    </>
}