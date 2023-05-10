//@ts-nocheck
import s from './s.module.scss'
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import React from "react";
import {IEmploymentCreate, IGroup, IStudentForm} from "../types";
import {employmentApi, groupApi} from "../../api/api";
import {useForm} from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import {useQuery} from "@tanstack/react-query";
export const OtherGroup = () => {

    const {data: groups, refetch} = useQuery({queryKey: ['gr'], queryFn:  () => groupApi.getGroup<IGroup[]>()})
    let id = 1
    const onSubmit = async (data:IEmploymentCreate)=>{
        await groupApi.create(data)
        refetch()
    }
    const onDelete= async (id:string)=>{
        await groupApi.del(id)
        refetch()
    }

    const {register, handleSubmit} = useForm<IStudentForm>()

    return <>
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form} >
                        <TextField id="outlined-basic" {...register('title')} label="Наименование группы" variant="outlined" />
                        <Button type="submit" variant="outlined">Добавить группу</Button>
            </form>
        </div>
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 100}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell>Группы</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups?.map(gr => (
                            <TableRow key={gr.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" >{id++}</TableCell>
                                <TableCell> {gr.title}</TableCell>
                                <TableCell><DeleteIcon onClick={()=>
                                    onDelete(gr.id)
                                }/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    </>

}