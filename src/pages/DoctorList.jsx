import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoctorDetails } from '../store/actions/doctors';
import { reserveAppointment } from '../store/actions/appointments';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Paper, Button, List, ListItem } from '@mui/material';


const DoctorList = () => {
  const { doctorDetails } = useSelector(state => state.doctors);
  const userId = useSelector(state => state.login.userId);
  const username = useSelector(state => state.login.username);
  const dispatch = useDispatch();
  const { doctorId } = useParams();

  useEffect(() => {
   dispatch(getDoctorDetails(doctorId));
  }, [doctorId, dispatch]);

  const handleReserveAppointment = (appointmentId, userId) => {
    dispatch(reserveAppointment( appointmentId, userId));
    
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h2">Lista de turnos del Médico</Typography>

        <Typography variant='h4'>Usuario: {username}</Typography>

        {doctorDetails?.doctor? (
          <>
            <Typography variant="h4">Nombre del Médico: {doctorDetails.doctor.name || 'Nombre no disponible'}</Typography>
            <Typography variant="h5">Especialidad: {doctorDetails.doctor.speciality ? doctorDetails.doctor.speciality.name : 'Especialidad no disponible'}</Typography>

            <Typography variant="h5">Turnos Disponibles</Typography>
            {doctorDetails?.appointments?.data ? (
              <List>
                {doctorDetails?.appointments.data.map(appointment => (
            <ListItem key={appointment._id}>
            Fecha y Hora: {new Date(appointment.date).toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}

            {appointment.isReserved ? (
              <Typography variant="body1">Reservado</Typography>
            ) : (
              <Button
                variant="contained"
                style={{ marginTop: '10px' }}
                onClick={() => handleReserveAppointment(appointment._id, userId)}
              >
                Reservar
              </Button>
            )}
          </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1">No hay turnos disponibles</Typography>
            )}
            
            <Link to="/paciente">
              <Button variant="contained" style={{ marginTop: '10px' }}>Volver a la lista de doctores</Button>
            </Link>
          </>
        ) : (
          <Typography variant="body1">Cargando detalles...</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default DoctorList;