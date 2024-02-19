import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Modal } from '@mui/material';

const RegisterForm = ({ onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [dni, setDNI] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegister = async () => {
    try {
    if (password.length < 6 || password !== repeatPassword) {
        console.error('Las contraseñas no coinciden o tienen menos de 6 caracteres.');
        return;
  }
        const newUser = {
            username,
            password,
            email,
            dni,
            isAdmin,
          };
    
          const response = await fetch('http://localhost:3001/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en el registro');
          }
    
          setUsername('');
          setPassword('');
          setRepeatPassword('');
          setDNI('');
          setEmail('');
          setIsAdmin(false);

          onCancel();

              
        } catch (error) {
          console.error('Error al registrar usuario:', error.message);
        }
      };


  return (
    <>       
     <Modal open={true} onClose={onCancel}>
     <Paper style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px' }}>

        <Typography variant="h5" align="center" gutterBottom>
          Registrarse
        </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Repeat Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="DNI"
          variant="outlined"
          margin="normal"
          fullWidth
          value={dni}
          onChange={(e) => setDNI(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
            <label>
              Es Admin:
              <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
            </label>
          </Grid>
      <Grid item xs={6}>
        <Button variant="contained" color="primary" fullWidth onClick={handleRegister} style={{ marginTop: '10px' }}>
          Registrar
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" color="secondary" fullWidth onClick={onCancel} style={{ marginTop: '10px' }}>
          Cancelar
        </Button>
      </Grid>
    </Grid>  
    </Paper>
    </Modal>

    </>
  );
};

export default RegisterForm;
