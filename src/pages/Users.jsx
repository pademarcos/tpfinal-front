import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearLoginData } from '../store/actions/login';
import { fetchUsers } from '../store/actions/users';
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  Paper,
  Divider,
} from '@mui/material';

const PAGE_SIZE = 10;
 
const Users = () => {
 
  const { isAuthenticated, username } = useSelector(state => state.login);
  const { users, totalPages, currentPage, isLoading, isAdmin } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {//porque?
    if (isAdmin) {
      navigate('/');  
    }
    if (isLoading) {
     dispatch(fetchUsers(currentPage, PAGE_SIZE));
    }
  }, [currentPage, isLoading]);

  const handleLogout = () => {
    dispatch(clearLoginData());
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchUsers(newPage, PAGE_SIZE));
    }
  };
  
  const handleShowAppointments = (user) => {
    setSelectedUser(user);
  };

  const handleHideAppointments = () => {
    setSelectedUser(null);
  };

  return (
    <Container>
      {isAuthenticated ? (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '20px', width: '100%' }}>
          <Typography variant="h3">Administrador: {username} </Typography>
          <Typography variant="h4">Lista de Usuarios</Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <Link to="/admin">
                <Button variant="contained" color="primary" style={{ marginLeft: '10px' }}>
                  Doctores
                </Button>
              </Link>
            </div>
            <div>
              <Link to="/">
                <Button variant="contained" color="primary" onClick={handleLogout} style={{ marginLeft: '10px' }}>
                  Cerrar Sesión
                </Button>
              </Link>
            </div>
          </div>
          <List>
            {users && users.length > 0 ? (
              users
                .filter((user) => !user.isAdmin)
                .map((user) => (
                  <div key={user._id}>
                    <ListItem style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ flex: '1' }}>
                        <Typography >Usuario: {user.username}</Typography>
                        <Typography >Email: {user.email}</Typography>
                        <Typography >DNI: {user.dni}</Typography>
                      </div>
                      <div style={{ marginLeft: '20px' }}>
                        <Button variant="contained" onClick={() => handleShowAppointments(user)}>
                          Turnos Cancelados
                        </Button>
                      </div>
                    </ListItem>
                    {selectedUser === user && user.canceledAppointments && user.canceledAppointments.length > 0 && (
                      <div>
                        <Typography variant="h6">Turnos Cancelados:</Typography>
                        <List>
                          {user.canceledAppointments.map((appointment) => (
                            <ListItem key={appointment._id}>
                              <Typography variant="body1">
                                Doctor: {appointment.doctor} - Fecha: {new Date(appointment.date).toLocaleString()}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                        <Button variant="contained" onClick={handleHideAppointments}>
                          Ocultar Turnos Cancelados
                        </Button>
                      </div>
                    )}
                    <Divider />
                  </div>
                ))
            ) : (
              <Typography variant="body1">No hay usuarios disponibles.</Typography>
            )}
          </List>
          <div>
            <Button
              disabled={currentPage === 1}
              variant="contained"
              onClick={() => handlePageChange(currentPage - 1)}
              style={{ marginRight: '10px' }}
            >
              Anterior
            </Button>
            <span>Página {currentPage} de {totalPages}</span>
            <Button
              disabled={currentPage === totalPages}
              variant="contained"
              onClick={() => handlePageChange(currentPage + 1)}
              style={{ marginLeft: '10px' }}
            >
              Siguiente
            </Button>
          </div>
        </Paper>
      ) : (
        // Redirige si no está autenticado
        <Link to="/" />
      )}
    </Container>
  );
};

export default Users;