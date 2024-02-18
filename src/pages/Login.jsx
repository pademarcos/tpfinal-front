import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Link, Grid, Typography, Paper, Modal } from '@mui/material';
import RegisterForm from '../components/Registro';
import { setUsername, setPassword, login } from '../store/actions/login';

export const addAuthorizationHeader = (headers, token) => {
  if (token) {
     headers.Authorization = `Bearer ${token}`;
    }
   return headers;
  };

const Login = () => {
  const { username, password, isAdmin, loginReady, clearingLoading } = useSelector(state => state.login);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login(username, password))
  }

  useEffect(()=>{
    if(loginReady){
      if (isAdmin) {
        navigate('/admin');  
      } else {
        navigate('/paciente');  
      }
    }
  }, [loginReady])

  const handlePasswordRecovery = () => {
    navigate('/recoverpassword');
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <>
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Iniciar Sesión
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin} style={{ marginTop: '10px' }}>
            Iniciar Sesión
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={handleOpenRegisterModal} style={{ marginTop: '10px' }}>
            Registrarse
          </Button>
          <Grid container justifyContent="space-between" style={{ marginTop: '10px' }}>
            <Grid item>
              <Link href="#" onClick={handlePasswordRecovery}>
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
    <Modal open={isRegisterModalOpen} onClose={handleCloseRegisterModal}>
    <RegisterForm onCancel={handleCloseRegisterModal} />
      </Modal>
    </>
  );
};

export default Login;