import React, { useEffect } from 'react';
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
} from '@mui/material';

const PAGE_SIZE = 10;

const Users = () => {
  const { isAuthenticated, username } = useSelector(state => state.login);
  const { users, totalPages, currentPage, isLoading, isAdmin } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(users)

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');  
    }
  
    if (isLoading) {
      dispatch(fetchUsers(currentPage, PAGE_SIZE));
    }
  }, [currentPage]);

  const handleLogout = () => {
    dispatch(clearLoginData());
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchUsers(newPage, PAGE_SIZE));
    }
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
              users.map((user) => (
                <ListItem key={user._id}>
                  <Typography>Username: {user.username}</Typography>
                  
                  <Typography>Email: {user.email}</Typography>
                  
                  <Typography>Admin: {user.isAdmin.toString()}</Typography>
                </ListItem>
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