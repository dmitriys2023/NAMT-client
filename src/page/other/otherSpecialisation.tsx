//@ts-nocheck
import s from './s.module.scss'
import {IEmploymentCreate, ISpecialisation, IStudentForm} from "../types";
import {employmentApi, specApi} from "../../api/api";
import {useForm} from "react-hook-form";
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
import {useQuery} from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
export const OtherSpecialisation = () => {

    const {data: speciality, refetch} = useQuery({queryKey: ['sp'], queryFn:  () => specApi.getSpec<ISpecialisation[]>()})
    let id = 1
    const onSubmit = async (data:IEmploymentCreate)=>{
        await specApi.create(data)
        refetch()
    }
    const onDelete= async (id:string)=>{
        await specApi.del(id)
        refetch()
    }
    const {register, handleSubmit} = useForm<IStudentForm>()

    return <>
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={s.form} >
                <TextField id="outlined-basic" {...register('title')} label="Наименование специальности" variant="outlined" />
                <Button type="submit" variant="outlined">Добавить специальность</Button>
            </form>
        </div>
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 200}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>№</TableCell>
                            <TableCell>Специальности</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {speciality?.map(sp => (
                            <TableRow key={sp.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" >{id++}</TableCell>
                                <TableCell> {sp.title}</TableCell>
                                <TableCell><DeleteIcon onClick={()=>
                                    onDelete(sp.id)
                                }/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    </>

}