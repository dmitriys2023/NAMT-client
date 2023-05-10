//@ts-nocheck
import s from './s.module.scss'
import React, {useEffect, useState} from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import {useQuery} from "@tanstack/react-query";
import {employmentApi, groupApi, reportApi} from "../../api/api";
import {IEmploymentCreate, IGroup, IReportStatus, IStudentForm} from "../types";
import DeleteIcon from "@mui/icons-material/Delete";
import {useForm} from "react-hook-form";



export const ReportPage = () => {
    const [group, setSelect] = useState('None')
    const [stat, setStat] = useState('None')
    const {register, handleSubmit, reset} = useForm<IReportStatus>()

    const {data: groups} = useQuery({queryKey: ['gr'], queryFn:  () => groupApi.getGroup<IGroup[]>()})
    const {data: status, refetch} = useQuery({queryKey: ['status'], queryFn:  () => reportApi.getByStatus<IReportStatus[]>({status:stat})})
    console.log(status)

    useEffect(()=>{
        refetch()
    }, [stat])

    let id = 1
    const onSubmit = async ()=>{
        // await reportApi.getByStatus(data)
        refetch()
        // reset()
    }
    const handleChange1 = (event: SelectChangeEvent) => {
        setStat(event.target.value);
    }

    const handleChange2 = (event: SelectChangeEvent) => {
        setSelect(event.target.value);
    }


    return <div>
        <h2 className={s.title}>Запросы | Отчеты</h2>
        <div className={s.root}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <p className={s.subtitle}>Количество студентов по статусу в группе:</p>
                <FormControl fullWidth>
                    <InputLabel id="spec-selected">Выберете статус</InputLabel>
                    <Select labelId="spec-selected" id="spec-selected" {...register('status')} label="Выберете статус" value={stat} onChange={handleChange1}>
                        <MenuItem value="None" onClick={()=>setStat('None')}><em>Выберете статус</em></MenuItem>
                        <MenuItem value="Трудоустроен" onClick={()=>setStat('Трудоустроен')}>Трудоустроен</MenuItem>
                        <MenuItem value="Учится" onClick={()=>setStat('Учится')}>Учится</MenuItem>
                        <MenuItem value="Не работает" onClick={()=>setStat('Не работает')}>Не работает</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">Выберете группу</InputLabel>
                    <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper" value={group} label="Выберете группу" onChange={handleChange2}>
                        <MenuItem value="None" onClick={()=>setSelect('None')}>
                            <em>Выберете группу</em>
                        </MenuItem>
                        {groups?.map(grp=>
                            <MenuItem
                                key={grp.id}
                                value={grp.title}
                                onClick={()=>{
                                    setSelect(grp.title)
                                }}
                            >{grp.title}</MenuItem>
                        )}
                    </Select>
                </FormControl>

            </form>

            <div className={s.table}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>№</TableCell>
                                <TableCell>Фамилия</TableCell>
                                <TableCell>Имя</TableCell>
                                <TableCell>Отчество</TableCell>
                                <TableCell>Организация</TableCell>
                                <TableCell>Профессия</TableCell>
                                <TableCell >По специальности</TableCell>
                                <TableCell >Статус</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {status && status.map(stat =>(
                                <TableRow key={stat.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell component="th" scope="row" >{id++}</TableCell>
                                    <TableCell>{stat.students?.last_name}</TableCell>
                                    <TableCell>{stat.students?.first_name}</TableCell>
                                    <TableCell>{stat.students?.patronymic}</TableCell>
                                    <TableCell>{stat.title_org}</TableCell>
                                    <TableCell>{stat.profession}</TableCell>
                                    <TableCell>{stat.by_speciality}</TableCell>
                                    <TableCell>
                                        {stat.status=="Учится" && <p className={s.study}>{stat.status}</p>}
                                        {stat.status=="Трудоустроен" && <p className={s.work}>{stat.status}</p>}
                                        {stat.status=="Не работает" && <p className={s.dontWork}>{stat.status}</p>}
                                        </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>

    </div>

}