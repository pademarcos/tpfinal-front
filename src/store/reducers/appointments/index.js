const initialState = {
    reservationError: null,
    reservedAppointments: [],
    addAppointmentError: null,
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
  
      default:
        return state;
    }
  };