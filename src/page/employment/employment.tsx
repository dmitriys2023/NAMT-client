//@ts-nocheck
import s from './s.module.scss'
import {
    Button,
    FormControl, FormControlLabel, FormLabel,
    InputLabel,
    MenuItem,
    Paper, Radio, RadioGroup,
    Select,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {employmentApi, groupApi, studentsApi} from "../../api/api";
import {IEmployment, IEmploymentCreate, IGroup, IStudent, IStudentForm} from "../types";
import React, {useEffect, useState} from "react";
import {SelectChangeEvent} from "@mui/material/Select";
import {IStudentEmployment} from "../types";
import DeleteIcon from "@mui/icons-material/Delete";
import {OtherPage} from "../other/other";
import {EmploymentTable} from "./employmentSelect";
import {EmploymentAdd} from "./employmentAdd";
import {useForm} from "react-hook-form";



export const EmploymentPage = () => {
    const [select, setSelect] = useState('0')
    const [student, setStudent] = useState('0')
    const {register, handleSubmit, reset} = useForm<IStudentForm>()

    const [gr, setAge] = useState('');
    const [st,setStud] = useState('');
    const [work,setWork] = useState('');
    const [status,setStatus] = useState('');
    const [open, setOpen] = useState(0);

    const {data: groups} = useQuery({queryKey: ['gr'], queryFn:  () => groupApi.getGroup<IGroup[]>()})
    const {data: studentGroup, refetch} = useQuery({queryKey: ['studGroup'], queryFn: () => studentsApi.getByGroup<IStudentEmployment[]>({groupId:select})})

    useEffect(()=>{
        refetch()
    }, [select])



    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    }
    const handleChange2 = (event: SelectChangeEvent) => {
        setStud(event.target.value);
    }
    const handleChange3 = (event: SelectChangeEvent) => {
        setWork(event.target.value);
    }
    const handleChange4 = (event: SelectChangeEvent) => {
        setStatus(event.target.value);
    }
    const onSubmit = async (data:IEmploymentCreate)=>{
        await employmentApi.create(data)
        refetch()
        reset()
    }


    return <div>
        <h2 className={s.title}>Трудоустройство студентов</h2>
        <div className={s.root}>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form} >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">Выберете группу</InputLabel>
                    <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={gr} label="Выберете группу" onChange={handleChange}>
                        <MenuItem value="None" onClick={()=>setSelect('0')}>
                            <em>Выберете группу</em>
                        </MenuItem>
                        {groups?.map(grp=>
                            <MenuItem
                                key={grp.id}
                                value={grp.title}
                                onClick={()=>{
                                    setSelect(grp.id)
                                    setStud("None")
                                    setStudent(0)
                                }}
                            >{grp.title}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="select-student">Выберете студента</InputLabel>
                    <Select labelId="select-student" {...register('student_id')} id="select-student" value={st} label="Выберете студента" onChange={handleChange2}>
                        <MenuItem value="None">
                            <em>Выберете студента</em>
                        </MenuItem>
                        {studentGroup?.map(student=>
                            <MenuItem
                                key={student.id}
                                value={student.id}
                                onClick={()=>{
                                    setStudent(student.id)
                                    setOpen(1)
                                }}
                                >{student.last_name +" "+ student.first_name +" "+ student.patronymic +" | "+student.specialisations?.title}</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <div className={s.m}></div>
                {open == 1 &&
                    <>
                <p className={s.subtitle}>Добавить информацию о статусе студента:</p>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">Статус студента</InputLabel>
                    <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" {...register('status')} value={status} label="По специальности?" onChange={handleChange4}>
                        <MenuItem value="Трудоустроен">Трудоустроен</MenuItem>
                        <MenuItem value="Учится">Учится</MenuItem>
                        <MenuItem value="Не работает">Не работает</MenuItem>

                    </Select>
                </FormControl>
                        <TextField id="outlined-basic" {...register('title_org')} label="Название организации" variant="outlined"/>
                        <TextField id="outlined-basic" {...register('profession')} label="Профессия студента" variant="outlined" />
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-helper-label">По специальности?</InputLabel>
                            <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" {...register('by_speciality')} value={work} label="По специальности?" onChange={handleChange3}>
                                    <MenuItem value="Да">Да</MenuItem>
                                    <MenuItem value="Нет">Нет</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="outlined">Добавить информацию</Button>
                    </>
                }




            </form>



            <div className={s.table}>

                <EmploymentTable studentID = {student}/>
            </div>


        </div>
    </div>
}