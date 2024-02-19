import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, List, ListItem, Paper, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { cancelAppointment } from '../store/actions/appointments';
import { getDoctorDetails } from '../store/actions/doctors';
import CancelIcon from '@mui/icons-material/Cancel';

const MisTurnos = () => {
  const { reservedAppointments, fetchReservedAppointmentsError } = useSelector((state) => state.appointments);
  const { doctorDetails, getDoctorDetailsError } = useSelector((state) => state.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (let i = 0; i < reservedAppointments.length; i++) {
          const appointment = reservedAppointments[i];
          await dispatch(getDoctorDetails(appointment.doctor));
        }
      } catch (error) {
        console.error('Error al obtener detalles de doctores:', error);
      }
    };

    fetchData();
  }, [dispatch, reservedAppointments]);

  const handleCancelAppointment = (appointmentId) => {
    const userId = sessionStorage.getItem('userId');
    dispatch(cancelAppointment(appointmentId, userId));
  };

  if (fetchReservedAppointmentsError || getDoctorDetailsError) {
    return <div>Error al cargar los turnos reservados: {fetchReservedAppointmentsError || getDoctorDetailsError}</div>;
  }

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4">Mis Turnos Reservados</Typography>
        <List>
          {reservedAppointments && reservedAppointments.length > 0 ? (
            reservedAppointments.map((appointment, index) => {
              const doctorDetailsForAppointment = doctorDetails[appointment.doctor] || {};

              return (
                <ListItem key={appointment._id}>
                  <Typography variant="h5">Doctor: {doctorDetailsForAppointment.name || 'Nombre no disponible'}</Typography>
                  <Typography variant="body1">
                    Especialidad: {doctorDetailsForAppointment.speciality ? doctorDetailsForAppointment.speciality.name : 'Especialidad no disponible'}
                  </Typography>
                  <Typography variant="body1">
                    Fecha: {new Date(appointment.date).toLocaleString()}
                  </Typography>
                  <IconButton onClick={() => handleCancelAppointment(appointment._id)} color="primary">
                    <CancelIcon />
                  </IconButton>
                </ListItem>
              );
            })
          ) : (
            <Typography variant="body1">No tienes turnos reservados.</Typography>
          )}
        </List>
        <Button component={Link} to="/paciente" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Regresar
        </Button>
      </Paper>
    </Container>
  );
};

export default MisTurnos;