const initialState = {
  isLoading: true,
  doctors: [],
  doctorDetails: {},
  getDoctorDetailsError: null,
  totalPages: 1,
  currentPage: 1,
}

export const doctorsReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'START_LOADING':
            return {...state, isLoading: true};


    case 'FETCH_DOCTORS':
      return {
          ...state,
          doctors: action.payload.doctors,
          totalPages: action.payload.pageInfo.totalPages,
          currentPage: action.payload.pageInfo.currentPage,
          isLoading: false
      };

    case 'FETCH_DOCTORS_BY_SPECIALITY':
      return {
          ...state,
          doctors: action.payload.doctors,
          isLoading: false
      };

    case 'GET_DETAILS':
      return{
        ...state,
        doctorDetails: action.payload,
        isLoading: false
      }

    case 'GET_DOCTOR_DETAILS_SUCCESS':
      return {
        ...state,
        doctorDetails: action.payload,
        getDoctorDetailsError: null,
        isLoading: false
      };

    case 'GET_DOCTOR_DETAILS_FAILURE':
      return {
        ...state,
        getDoctorDetailsError: action.payload,
      };

    default:
      return state;
  }
};