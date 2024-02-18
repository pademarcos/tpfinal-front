const initialState = {
    isLoading: true,
    users: [],
    totalPages: 1,
    currentPage: 1,
    error: null,
  };
  
  export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'START_USERS_LOADING':
            return {...state, isLoading: true};

      case 'FETCH_USERS_SUCCESS':
        return {
          ...state,
          users: action.payload.data,
          totalPages: action.payload.pageInfo.totalPages,
          currentPage: action.payload.pageInfo.currentPage,
          isLoading: false,
          error: null,
        };
  
      case 'FETCH_USERS_FAILURE':
        return {
          ...state,
          users: [],
          error: action.payload,
          isLoading: false,
        };


      default:
        return state;
    }
  };
  