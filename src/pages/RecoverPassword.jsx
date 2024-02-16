import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implementa la lógica para enviar el correo electrónico al backend para recuperar la contraseña
    // Puedes utilizar la variable 'email' para enviarla al backend
  };

  const handleNavigateToLogin = () => {
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
        <Typography component="h1" variant="h5">
          Recuperar Contraseña
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: 10 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '20px 0' }}
          >
            Enviar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleNavigateToLogin}
            style={{ marginTop: '10px' }}
          >
            Regresar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RecoverPassword;
