const initialState = {
  isLoading: true,
  doctors: [],
  doctorDetails: null,
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

    case 'GET_DETAILS':
      return{
        ...state,
        doctorDetails: action.payload,
      }

    default:
      return state;
  }
};