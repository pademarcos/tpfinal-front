const initialState = {
    reservationError: null,
    reservedAppointments: [],
    addAppointmentError: null,
    fetchReservedAppointmentsError: null,
  };
  
  export const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case 'RESERVE_APPOINTMENT_SUCCESS':
        return {
          ...state,
          reservationError: null, 
          reservedAppointments: [...state.reservedAppointments, action.payload.appointmentId],
        
        };
  
      case 'RESERVE_APPOINTMENT_FAILURE':
        return {
          ...state,
          reservationError: action.payload, 
        };

      case 'ADD_APPOINTMENT_SUCCESS':
        return {
          ...state,
          addAppointmentError: null,
        };
  
      case 'ADD_APPOINTMENT_FAILURE':
        return {
          ...state,
          addAppointmentError: action.payload,
        };

      case 'FETCH_RESERVED_APPOINTMENTS_SUCCESS':
        return {
          ...state,
          fetchReservedAppointmentsError: null,
          reservedAppointments: action.payload,
        };
  
      case 'FETCH_RESERVED_APPOINTMENTS_FAILURE':
        return {
          ...state,
          fetchReservedAppointmentsError: action.payload,
        };
  
      default:
        return state;
    }
  };