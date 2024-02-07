import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoctors, fetchDoctorsBySpeciality } from '../store/actions/doctors';
import { fetchSpecialities } from '../store/actions/specialities';
import { Container, Grid, FormControl, MenuItem, InputLabel, Select, Typography, List, ListItem, Button, Paper } from '@mui/material';

const Paciente = () => {
  const [speciality, setSpeciality] = useState(null)
  const { specialities } = useSelector(state => state.specialities);
  const { doctors, PAGE_SIZE } = useSelector(state => state.doctors);
  
  const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchSpecialities());
   }, [dispatch]);
   
  const handleSpecialityChange = (event) => {
    const selectedSpeciality = event.target.value;
    setSpeciality(selectedSpeciality);
    
    if (selectedSpeciality) {
      dispatch(fetchDoctorsBySpeciality(selectedSpeciality));
    } else {
      dispatch(fetchDoctors(1, PAGE_SIZE));
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }} >
      <Typography variant="h1">Pacientes</Typography>
      <Typography variant="h5">Seleccione una especialidad:</Typography>
      <Grid>
      <FormControl fullWidth style={{ marginBottom: '10px' }}>
        <InputLabel>Especialidad</InputLabel>
        <Select
          name="speciality"
          value={speciality}
          onChange={handleSpecialityChange}
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
      </Grid>
      {speciality && (
        <>
          <Typography variant="h5">Doctores de la especialidad: {speciality}</Typography>
          <List>
            {doctors && doctors.length > 0 ? (
              doctors.map((doctor) => (
                <ListItem key={doctor._id}>
                  <strong>{doctor.name}</strong> - Especialidad: {doctor.speciality.name}{' '}
                  <Button component={Link} to={`/paciente/doctor_list/${doctor._id}`} variant="contained" style={{ marginRight: '10px' }}>
                    Detalles
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1">No hay doctores disponibles para esta especialidad.</Typography>
            )}
          </List>
        </>
      )}
      </Paper>
    </Container>
  );
};

export default Paciente;
