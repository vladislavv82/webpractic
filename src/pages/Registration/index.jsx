import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";


export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit,
      formState: {errors, isValid } } = useForm({
    defaultValues:{
      fullname: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values) =>{
    const data = await dispatch(fetchRegister(values));

    if(!data.payload){
      return alert ('Не удалось зарегестрироваться')
    }

    if ('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token)
    }else{
      alert ('Не удалось авторизоваться')
    }
  }

  if(isAuth){
    return<Navigate to="/"/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField className={styles.field} 
      error= {Boolean(errors.fullName?.message)}
      {... register('fullName',{ required: 'Укажите ФИО  ' })} label="Полное имя" fullWidth />


      <TextField className={styles.field} 
      error= {Boolean(errors.email?.message)}
      {... register('email',{ required: 'Укажите e-mail ' })} label="E-Mail" fullWidth />


      <TextField className={styles.field} 
      error= {Boolean(errors.password?.message)}
      {... register('fullName',{ required: 'Укажите пароль ' })} label="Пароль" fullWidth />


      <Button disabled={!isValid} type="submit" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
