const initialState = {
    username: '',
    token: null,
  };
  
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOGIN_DATA':
        return {
          ...state,
          username: action.payload.username,
          token: action.payload.token,
        };
  
      case 'CLEAR_LOGIN_DATA':
        return {
          ...state,
          username: '',
          token: null,
        };
  
      default:
        return state;
    }
  };