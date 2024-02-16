import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Paper,
  Typography,
} from '@material-ui/core';

    const NewPassword = () => {
        return (
          <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: 20, marginTop: 50 }}>
              <Typography component="h1" variant="h5">
                Nueva Contraseña
              </Typography>
              <Link to="/recover-password" style={{ textDecoration: 'none' }}>
                {/* Modifica la ruta en el enlace */}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ margin: '20px 0' }}
                >
                  Recuperar Contraseña
                </Button>
              </Link>
            </Paper>
          </Container>
        );
      };
      
      export default NewPassword;