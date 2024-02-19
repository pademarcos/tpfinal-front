import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoctors, addDoctor, updateDoctor  } from '../store/actions/doctors';
import { clearLoginData, clearLogin } from '../store/actions/login';
import { fetchSpecialities } from '../store/actions/specialities';
import { Container, Typography, List, ListItem, Button, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PAGE_SIZE = 10;

const Admin = () => {
  const { username, isAdmin } = useSelector(state => state.login);
  const { doctors, isLoading, totalPages, currentPage } = useSelector(state => state.doctors);
  const { specialities } = useSelector(state => state.specialities);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    speciality: '',
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleLogout = () => {
    dispatch(clearLoginData());
    navigate('/');
  };

  useEffect(() => {
    window.addEventListener('popstate', handleLogout);
    return () => {
      window.removeEventListener('popstate', handleLogout);
    };
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');  
    }
    if(isLoading){
      dispatch(fetchDoctors(currentPage, PAGE_SIZE));
      dispatch(fetchSpecialities());
    }
  }, [currentPage, isLoading]);
  

  const handleEditClick = async (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      dispatch(addDoctor(newDoctor, token));
      setNewDoctor({
        name: '',
        speciality: '',
      });
      alert('Médico agregado con éxito');
    } catch (error) {
      console.error('Error al agregar el médico:', error);
      alert('Error al agregar el médico. Por favor, inténtelo de nuevo.');
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('token');
      const updatedDoctorData = {
        _id: selectedDoctor._id,
        name: selectedDoctor.name,
        speciality: selectedDoctor.speciality.name
      };
      dispatch(updateDoctor(updatedDoctorData, token));
      setSelectedDoctor(null);
      alert('Médico modificado con éxito');
    } catch (error) {
      console.error('Error al modificar el médico:', error);
      alert('Error al modificar el médico. Por favor, inténtelo de nuevo.');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchDoctors(newPage, PAGE_SIZE));
    }
  };



  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px', marginBottom: '20px', width: '100%' }}>
        <Typography variant="h3">Administrador</Typography>
        <Typography variant="h4">Bienvenido, {username} </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div>
            <Link to="/users">
            <Button variant="contained" color="primary">
              Usuarios
            </Button>
            </Link>
          </div>
          <div>
            <Link to="/">
              <Button variant="contained" color="primary" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Link>
          </div>
        </div>

        <Grid container spacing={2} style={{ width: '100%' }}>
          <Grid item xs={12}>
            <Typography variant="h4">Lista de Doctores Disponibles </Typography>
            <List>
              {doctors && doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <ListItem key={doctor._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <strong>{doctor.name}</strong> <br />
                      Especialidad: {doctor.speciality.name}
                    </div>
                    <div>
                      <Button component={Link} to={`/doctor/${doctor._id}`} variant="contained" style={{ marginRight: '10px' }}>
                        Detalles
                      </Button>
                      <Button variant="contained" onClick={() => handleEditClick(doctor)}>
                        Modificar
                      </Button>
                    </div>
                  </ListItem>
                ))
              ) : (
                <Typography variant="body1">No hay doctores disponibles.</Typography>
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
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Agregar Nuevo Médico</Typography>
            <form onSubmit={handleAddSubmit}>
              <TextField
                label="Nombre del Médico"
                type="text"
                name="name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                required
                fullWidth
                style={{ marginBottom: '10px' }}
              />
              <FormControl fullWidth style={{ marginBottom: '10px' }}>
                <InputLabel>Especialidad</InputLabel>
                <Select
                  name="speciality"
                  value={newDoctor.speciality}
                  onChange={(e) => setNewDoctor({ ...newDoctor, speciality: e.target.value })}
                  required
                >
                  <MenuItem value="">Seleccione una especialidad</MenuItem>
                  {specialities.map((speciality) => (
                    <MenuItem key={speciality._id} value={speciality.name}>
                      {speciality.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" variant="contained">
                Agregar Médico
              </Button>
            </form>
          </Grid>
          {selectedDoctor && (
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className='updateDoctor'>Modificar Médico</Typography>
              <form onSubmit={handleUpdateSubmit}>
                <TextField
                  label="Nombre del Médico"
                  type="text"
                  name="name"
                  value={selectedDoctor.name}
                  onChange={(e) => setSelectedDoctor({ ...selectedDoctor, name: e.target.value })}
                  required
                  fullWidth
                  style={{ marginBottom: '10px' }}
                />
                <FormControl fullWidth style={{ marginBottom: '10px' }}>
                  <InputLabel>Especialidad</InputLabel>
                  <Select
                    name="speciality"
                    value={selectedDoctor.speciality.name}
                    onChange={(e) => setSelectedDoctor({ ...selectedDoctor, speciality: { name: e.target.value } })}
                    required
                  >
                    <MenuItem value="">Seleccione una especialidad</MenuItem>
                    {specialities.map((speciality) => (
                      <MenuItem key={speciality._id} value={speciality.name}>
                        {speciality.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button type="submit" variant="contained">
                  Aceptar Modificación
                </Button>
                <Button
                  variant="contained"
                  onClick={() => setSelectedDoctor(null)}
                  style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
                >
                  Cancelar
                </Button>
              </form>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Admin;
