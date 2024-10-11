import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form';
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, isAuthSelector } from "../../redux/slices/auth";
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
  const userData = useSelector((state) => state.auth.data)
  const userPassword = userData?.password

  const { register, handleSubmit, formState: { errors, isValid }, setError } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    try {
      const data = await dispatch(fetchAuth(values));

      if (data.payload && 'token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      } else {
        setError('email', { type: 'manual', message: 'Не удалось авторизоваться' });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ошибка при авторизации';
      setError('email', { type: 'manual', message: errorMessage });
      setError('password', { type: 'manual', message: errorMessage });
    }
  };

  const [fadeIn, setFadeIn] = useState(false);
  
  useEffect(() => {
    setFadeIn(true); 
  }, []);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: `${styles.root} ${fadeIn ? styles.fadeIn : ''}` }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <Typography className={styles.subtitle}>
        Пожалуйста, введите свои данные для доступа к аккаунту.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email)} 
          helperText={errors.email?.message} 
          type="email"
          {...register('email', { required: 'Укажите почту' })} 
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password)} 
          helperText={errors.password?.message} 
          type="password"
          {...register('password', { required: 'Укажите пароль' })} 
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
        <Typography className={styles.forgotPassword}>
          Забыли пароль? <a href="/reset-password">Восстановите его</a>
        </Typography>
      </form>
      <Typography className={styles.footer}>
        Или <a href="/register">зарегистрируйтесь</a> если у вас нет аккаунта.
      </Typography>
    </Paper>
  );
};
