import React from 'react';
import HeroGrid from './HeroGrid';
import LoginForm from '../../login/LoginForm';
import RegisterForm from '../../register/RegisterForm';
import lionlogo from '../../../assets/lionlogo.png';
import styles from './LoginRegisterLayout.module.css';
import LogoDivider from './LogoDivider';
import Copyright from '../../copyright/Copyright';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const LoginRegisterLayout = ({ form, title }) => {
  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <HeroGrid item xs={false} sm={false} md={4} lg={7} />
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={5}
        component={Paper}
        elevation={6}
        p={4}
        square
        sx={{
          position: 'relative'
        }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems='center'
          justifyContent='center'
          spacing={3}
          m={4}
          sx={{
            flexShrink: 0
          }}>
          <Box className={styles['lionborder']}>
            <img src={lionlogo} className={styles['lionlogo']} alt='Logo' />
          </Box>
          <Typography
            variant='h2'
            sx={{
              textTransform: 'uppercase',
              letterSpacing: 10
            }}>
            {title}
          </Typography>
        </Stack>
        <LogoDivider />
        {form === 'login' ? <LoginForm /> : <RegisterForm />}
        <Box
          sx={{
            position: 'absolute',
            mt: 4,
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)'            
          }}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginRegisterLayout;
