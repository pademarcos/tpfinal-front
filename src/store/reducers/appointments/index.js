const initialState = {
    reservationError: null,
    reservedAppointments: [],
  };
  
  export const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case 'RESERVE_APPOINTMENT_SUCCESS':
        return {
          ...state,
          reservationError: null, 
          reservedAppointments: [...state.reservedAppointments, action.payload.appointmentId],//pasar el userId!!!
        
        };
  
      case 'RESERVE_APPOINTMENT_FAILURE':
        return {
          ...state,
          reservationError: action.payload, // Almacena el error si falla la reserva
        };
  
      default:
        return state;
    }
  };