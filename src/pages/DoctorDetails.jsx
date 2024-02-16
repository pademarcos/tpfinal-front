import React, { useState,useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDoctorDetails } from '../store/actions/doctors';
import { addAppointment } from '../store/actions/appointments';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Paper, Button, List, ListItem } from '@mui/material';
import AppointmentForm from '../components/AppointmentForm';


const DoctorDetails = () => {
  const { doctorDetails } = useSelector(state => state.doctors);
  const { addAppointmentError } = useSelector(state => state.appointments);
  const dispatch = useDispatch();
  const { doctorId } = useParams();

  const [showForm, setShowForm] = useState(false); 
  const [selectedDate, setSelectedDate] = useState('');

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleAddAppointment = (date) => {
    console.log(date)
    dispatch(addAppointment(doctorDetails.doctor._id, date));
    dispatch(getDoctorDetails(doctorId));
    toggleForm();
  };

  useEffect(() => {
   dispatch(getDoctorDetails(doctorId));
  }, [doctorId, dispatch]);

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h2">Detalles del Médico</Typography>

        {doctorDetails?.doctor? (
          <>
            <Typography variant="h4">Nombre del Médico: {doctorDetails.doctor.name || 'Nombre no disponible'}</Typography>
            <Typography variant="h6">Especialidad: {doctorDetails.doctor.speciality ? doctorDetails.doctor.speciality.name : 'Especialidad no disponible'}</Typography>

            <Typography variant="h5">Turnos Disponibles</Typography>
            {doctorDetails?.appointments?.data ? (
              <List>
                {doctorDetails?.appointments.data.map(appointment => (
                  <ListItem key={appointment._id}>
                    Fecha y Hora: {new Date(appointment.date).toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1">No hay turnos disponibles</Typography>
            )}

            <Button variant="contained" style={{ marginTop: '10px' }} onClick={toggleForm}>
              Agregar Nuevo Turno
            </Button>

            {showForm && (

              <div>
                        <AppointmentForm
                        selectedDate={selectedDate}
                        onDateChange={handleDateChange}
                        onAddAppointment={handleAddAppointment}
                      />
                         {addAppointmentError && <Typography variant="body1" color="error">{addAppointmentError}</Typography>}
                      </div>
            )}
            
            <Link to="/admin">
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

export default DoctorDetails;