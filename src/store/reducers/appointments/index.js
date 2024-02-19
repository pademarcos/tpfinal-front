const initialState = {
    isLoading: true,
    reservationError: null,
    reservedAppointments: [],
    addAppointmentError: null,
    fetchReservedAppointmentsError: null,
    cancelAppointmentError: null,
  };
  
  export const appointmentsReducer = (state = initialState, action) => {
    switch (action.type) {

      case 'START_LOADING':
        return {...state, isLoading: true};
  
      case 'RESERVE_APPOINTMENT_SUCCESS':
        return {
          ...state,
          reservationError: null, 
          reservedAppointments: [...state.reservedAppointments, action.payload.appointmentId],
          isLoading: false
        
        };
  
      case 'RESERVE_APPOINTMENT_FAILURE':
        return {
          ...state,
          reservationError: action.payload, 
          isLoading: false
        };

      case 'ADD_APPOINTMENT_SUCCESS':
        return {
          ...state,
          addAppointmentError: null,
          isLoading: false
        };
  
      case 'ADD_APPOINTMENT_FAILURE':
        return {
          ...state,
          addAppointmentError: action.payload,
          isLoading: false
        };

      case 'FETCH_RESERVED_APPOINTMENTS_SUCCESS':
        return {
          ...state,
          fetchReservedAppointmentsError: null,
          reservedAppointments: action.payload,
          isLoading: false
        };
  
      case 'FETCH_RESERVED_APPOINTMENTS_FAILURE':
        return {
          ...state,
          fetchReservedAppointmentsError: action.payload,
          isLoading: false
        };

      case 'CANCEL_APPOINTMENT_SUCCESS':
        return {
          ...state,
          cancelAppointmentError: null,
          reservedAppointments: state.reservedAppointments.filter(id => id !== action.payload.appointmentId),
          isLoading: false
        };
  
      case 'CANCEL_APPOINTMENT_FAILURE':
        return {
          ...state,
          cancelAppointmentError: action.payload,
          isLoading: false
        };

      case 'DELETE_APPOINTMENT_SUCCESS':
        return {
          ...state,
          data: state.data.filter(appointment => appointment._id !== action.payload.appointmentId),
        };
  
      case 'DELETE_APPOINTMENT_FAILURE':
        return {
          ...state,
          deleteAppointmentError: action.payload,
        };
  
      default:
        return state;
    }
  };