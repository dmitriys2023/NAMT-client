//@ts-nocheck
import {
    Button,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import s from './s.module.scss'
import {useQuery} from "@tanstack/react-query";
import {employmentApi, specApi, studentsApi} from "../../api/api";
import {IEmployment} from "../types";
import React, {useEffect} from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const EmploymentTable=(props:any)=>{
    let id = 1
    const {data: employment,refetch} = useQuery({queryKey: ['studSpec'], queryFn: () => employmentApi.getByStudID<IEmployment[]>(props)})

    useEffect(()=>{
        refetch()
    },[props])

    const onDelete= async (id:string)=>{
        await employmentApi.del(id)
        refetch()
    }

    return <div>

        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>№</TableCell>
                        <TableCell>Организация</TableCell>
                        <TableCell>Профессия</TableCell>
                        <TableCell >По специальности</TableCell>
                        <TableCell >Статус</TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employment && employment.map(employ =>(
                        <TableRow key={employ.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                            <TableCell component="th" scope="row" >{id++}</TableCell>
                            <TableCell> {employ.title_org}</TableCell>
                            <TableCell>{employ.profession}</TableCell>
                            <TableCell>{employ.by_speciality}</TableCell>
                            {employ.status =="Учится" && <TableCell><p className={s.study}>{employ.status}</p></TableCell>}
                            {employ.status =="Трудоустроен" && <TableCell ><p className={s.work}>{employ.status}</p></TableCell>}
                            {employ.status =="Не работает" && <TableCell ><p className={s.dontWork}>{employ.status}</p></TableCell>}
                            <TableCell><DeleteIcon
                                onClick={()=>
                                    onDelete(employ.id)
                            }
                            /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>

}