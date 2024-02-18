export const reserveAppointment = (appointmentId, userId) => async (dispatch) => {
    try {
      await fetch(`http://localhost:3001/api/appointments/reserve/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ appointmentId }),
      });
  
      dispatch({ type: 'RESERVE_APPOINTMENT_SUCCESS', payload: { appointmentId } });
    } catch (error) {
      dispatch({ type: 'RESERVE_APPOINTMENT_FAILURE', payload: error.message });
    }
  };

  export const addAppointment = (doctorId, date) => async (dispatch) => {
    try {
      await fetch('http://localhost:3001/api/appointments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ doctor: doctorId, date }),
      });
  
      dispatch({ type: 'ADD_APPOINTMENT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'ADD_APPOINTMENT_FAILURE', payload: error.message });
    }
  };

  export const fetchReservedAppointments = () => async (dispatch) => {
    try {
      const userId = sessionStorage.getItem('userId'); 
        console.log(userId)
      const response = await fetch(`http://localhost:3001/api/appointments/listByPatient/${userId}`);
      const data = await response.json();

      console.log(data)
  
      dispatch({ type: 'FETCH_RESERVED_APPOINTMENTS_SUCCESS', payload: data.appointments });
    } catch (error) {
      dispatch({ type: 'FETCH_RESERVED_APPOINTMENTS_FAILURE', payload: error.message });
    }
  };