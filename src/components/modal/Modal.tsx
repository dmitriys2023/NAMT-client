//@ts-nocheck
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import s from "./s.module.scss";
import {Alert, TextField} from "@mui/material";
import {IAuth, IEmploymentCreate, IStudentForm} from "../../page/types";
import {authApi, groupApi} from "../../api/api";
import {useForm} from "react-hook-form";
import {UserApi} from "../../api/apiAuth";
import {useState} from "react";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius:'15px',
    boxShadow: 24,
    p: 4,
};
export const ModalWindow = () =>{

    const [open, setOpen] = React.useState(true);


    const [errorMessage, setErrorMessage] = useState('')

    const {register, handleSubmit} = useForm<IStudentForm>()
    const onSubmit = async (data:IAuth)=>{
        try {
            await UserApi.login(data)
            setOpen(false)
            setErrorMessage('')
        }
        catch (err){
            if(err.response){
                setErrorMessage(err.response.data.message)
            }
        }
    }

    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Авторизация
                    </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} className={s.form} >
                            <TextField id="outlined-basic" {...register('login')} label="Логин" variant="outlined" value="dima1703"/>
                            <TextField id="outlined-basic" {...register('password')} label="Пароль" variant="outlined" value="0001"/>
                            {errorMessage !='' && <Alert severity="error">{errorMessage}</Alert>}
                            <Button type="submit" variant="outlined">Войти</Button>
                        </form>
                </Box>
            </Modal>
        </div>
    );
}