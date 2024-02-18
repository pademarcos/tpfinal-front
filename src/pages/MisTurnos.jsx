import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, List, ListItem, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchReservedAppointments } from '../store/actions/appointments';
import { getDoctorDetails } from '../store/actions/doctors';

const MisTurnos = () => {
    const { reservedAppointments, fetchReservedAppointmentsError } = useSelector((state) => state.appointments);
    const { doctors } = useSelector((state) => state.doctors);
    const dispatch = useDispatch();
    const [doctorsDetails, setDoctorsDetails] = useState([]);


    useEffect(() => {
      const fetchData = async () => {
        try {
          const doctorsDetailsPromises = reservedAppointments.map(async (appointment) => {
            const doctorDetails = await dispatch(getDoctorDetails(appointment.doctor));
            return doctorDetails; 
          });
    
          const resolvedDoctorsDetails = await Promise.all(doctorsDetailsPromises);
          setDoctorsDetails(resolvedDoctorsDetails);
        } catch (error) {
          console.error('Error al obtener detalles de doctores:', error);
        }
      };
    
      fetchData();
    }, [dispatch, reservedAppointments]);
  
  
    if (fetchReservedAppointmentsError) {
      return <div>Error al cargar los turnos reservados: {fetchReservedAppointmentsError}</div>;
    } 
  
    return (
      <Container>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h3">Mis Turnos</Typography>
          <List>
            {reservedAppointments && reservedAppointments.length > 0 ? (
              reservedAppointments.map((appointment) => {
                const doctorDetails = doctors.find((doctor) => doctor._id === appointment.doctor);
  
                return (
                  <ListItem key={appointment._id}>
                    <Typography variant="h5">Doctor: {doctorDetails?.name || 'Nombre no disponible'}</Typography>
                    <Typography variant="body1">
                      Especialidad: {doctorDetails?.speciality ? doctorDetails.speciality.name : 'Especialidad no disponible'}
                    </Typography>
                    <Typography variant="body1">
                      Fecha: {new Date(appointment.date).toLocaleString()}
                    </Typography>
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
  