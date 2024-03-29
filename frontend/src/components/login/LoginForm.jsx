import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { LoginValidationSchema } from './LoginValidationSchema';

import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { CustomTextField } from '../loginregister/CustomTextField';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      setIsLoggingIn(true);
      setErrorMessage('');
      try {
        await login(values);
      } catch (error) {
        if (error.message.includes('404') || error.message.includes('400')) {
          setErrorMessage('Invalid username or password');
          formik.setErrors({
            username,
            password
          });
        } else {
          setErrorMessage('Something went wrong');
        }
      }
      setIsLoggingIn(false);
    }
  });

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box component='form' onSubmit={formik.handleSubmit} mt={4}>
      <CustomTextField 
        margin='normal'
        fullWidth
        autoFocus
        autoComplete='off'
        id='username'
        name='username'
        label='Username'
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PersonIcon />
            </InputAdornment>
          )
        }}
      />
      <CustomTextField
        margin='normal'
        fullWidth
        autoComplete='off'
        id='password'
        name='password'
        label='Password'
        type={showPassword ? 'text' : 'password'}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                tabIndex={-1}
                edge='end'>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <LoadingButton
        type='submit'
        loading={isLoggingIn}
        fullWidth
        variant='contained'
        sx={{ mt: 3, mb: 2 }}>
        <span>Login</span>
      </LoadingButton>
      <Typography color='error' sx={{ textAlign: 'center' }}>
        {errorMessage}
      </Typography>
      <Divider sx={{ my: 2 }}>or</Divider>
      <Typography align='center' mb={5}>
        Don't have an account?{' '}
        <Link component={RouterLink} to='/register' underline='hover'>
          Register
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
