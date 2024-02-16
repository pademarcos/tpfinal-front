import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const AppointmentForm = ({ onAddAppointment }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleAddClick = () => {
    
    onAddAppointment(selectedDate);
  };

  return (
    <div>
      <TextField
        label="Fecha y Hora"
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
        value={selectedDate}
        onChange={handleDateChange}
      />
      <Button variant="contained" style={{ marginTop: '10px' }} onClick={handleAddClick}>
        Agregar Turno
      </Button>
    </div>
  );
};

export default AppointmentForm;
