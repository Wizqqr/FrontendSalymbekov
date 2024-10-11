import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from '../../axios.js';
import styles from './Registration.module.scss';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, isAuthSelector } from "../../redux/slices/auth";
import DeleteIcon from '@mui/icons-material/Delete'; 
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';

export const Registration = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector);
    const navigate = useNavigate();
    const [avatarUrl, setImageUrl] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const inputFileRef = React.useRef(null);

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            if (!file) {
                setError("avatar", {
                    type: "manual",
                    message: "Выберите файл для загрузки",
                });
                return;
            }
            formData.append('image', file);

            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (err) {
            console.warn(err);
            setError("avatar", {
                type: "manual",
                message: "Ошибка при загрузке файла",
            });
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onSubmit = async (values) => {
        try {
            setLoading(true);
            const data = {
                fullName: values.fullName,
                email: values.email,
                password: values.password,
                avatarUrl,
            };

            const response = await axios.post('/auth/register', data);
            dispatch(fetchRegister(data));
            navigate('/login');
        } catch (err) {
            if (err.response?.data?.message) {
                setError('email', {
                    type: 'manual',
                    message: err.response.data.message,
                });
            } 
            } 
    };

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.recommendations}>
              <img src="https://salymbekov.com/wp-content/uploads/2023/02/logo-salymbekov-university-site.png" alt="" />
                <Typography variant="h6" className={styles.recommendationTitle}>
                    Почему стоит зарегистрироваться?
                </Typography>
                <ul className={styles.recommendationList}>
                    <li>Получите доступ к эксклюзивным курсам и материалам.</li>
                    <li>Участвуйте в обсуждениях и обмене знаниями.</li>
                    <li>Станьте частью активного сообщества студентов.</li>
                    <li>Следите за своим прогрессом и получайте сертификаты.</li>
                </ul>
            </div>
            <Paper classes={{ root: styles.registrationForm }}>
                <Typography classes={{ root: styles.title }} variant="h5">
                    Регистрация на курс
                </Typography>
                <div className={styles.avatarContainer}>
                    <Avatar
                        sx={{ width: 100, height: 100, margin: '0 auto 10px' }}
                        src={avatarUrl ? `http://localhost:4444${avatarUrl}` : undefined}
                        onClick={() => inputFileRef.current.click()}
                    />
                    <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                    {avatarUrl && (
                        <Button
                            variant="contained"
                            size='small'
                            color="error"
                            onClick={onClickRemoveImage}
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                transform: 'translate(-360%, 250%)',
                                minWidth: 'auto',
                                padding: '4px',
                                borderRadius: '50%',
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </Button>
                    )}
                    {errors.avatar && (
                        <Typography color="error" variant="body2">
                            {errors.avatar.message}
                        </Typography>
                    )}
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        className={styles.field}
                        variant="outlined"
                        label="Полное имя"
                        error={Boolean(errors.fullName)}
                        helperText={errors.fullName?.message}
                        {...register('fullName', { required: 'Укажите имя' })}
                        fullWidth
                    />
                    <TextField
                        className={styles.field}
                        variant="outlined"
                        label="Email"
                        type="email"
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        {...register('email', { required: 'Укажите почту' })}
                        fullWidth
                    />
                    <TextField
                        className={styles.field}
                        variant="outlined"
                        label="Пароль"
                        type="password"
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        {...register('password', { required: 'Укажите пароль', minLength: { value: 6, message: 'Пароль должен содержать минимум 6 символов' } })}
                        fullWidth
                    />
                    <div className={styles.buttons}>
                        <Button type="submit" size="large" variant="contained" className={styles.submitButton}>
                            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
                        </Button>
                        <a href="/">
                            <Button size="large" className={styles.cancelButton}>Отмена</Button>
                        </a>
                    </div>
                </form>
            </Paper>
        </div>
    );
};
