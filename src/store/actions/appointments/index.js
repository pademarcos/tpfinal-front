export const reserveAppointment = (appointmentId, userId) => async (dispatch) => {
    try {
      await fetch(`http://localhost:3001/api/appointments/reserve/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Incluir el token de autenticación !!!!!!!
        },
        body: JSON.stringify({ appointmentId }),
      });
  
      dispatch({ type: 'RESERVE_APPOINTMENT_SUCCESS', payload: { appointmentId } });
    } catch (error) {
      dispatch({ type: 'RESERVE_APPOINTMENT_FAILURE', payload: error.message });
    }
  };