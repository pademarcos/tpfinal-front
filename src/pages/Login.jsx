import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Link, Grid, Typography, Paper, Modal } from '@mui/material';
import RegisterForm from '../components/Registro';
import { jwtDecode } from 'jwt-decode';
import { setLoginData } from '../store/actions/login';

export const addAuthorizationHeader = (headers, token) => {
  if (token) {
     headers.Authorization = `Bearer ${token}`;
    }
   return headers;
  };

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username: storedUsername, token } = useSelector(state => state.login);


  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la autenticación');
      }

      const tokenData = await response.json();
      const token = tokenData.token; 

      dispatch(setLoginData(username, token));

      sessionStorage.setItem('token', token);
      
      const decodedToken = jwtDecode(token);
      if (decodedToken.admin) {
        navigate('/admin');  
      } else {
        navigate('/paciente');  
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
    }
  };



  const handlePasswordRecovery = () => {
    // recuperar contraseña
    console.log('Recuperar Contraseña');
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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