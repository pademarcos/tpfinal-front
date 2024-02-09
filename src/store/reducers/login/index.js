const initialState = {
  username: localStorage.getItem('username') || '',
  password: '',
  token: localStorage.getItem('token') || '',
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
};
  
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOGIN_DATA':
        return {
          ...state,
          username: action.payload.username,
          token: action.payload.token,
          isAuthenticated: true,
        };

        case 'SET_USERNAME':
          return {
            ...state,
            username: action.payload,
          };
    
        case 'SET_PASSWORD':
          return {
            ...state,
            password: action.payload,
          };
  
        case 'CLEAR_LOGIN_DATA':
          return {
            ...state,
            username: '',
            password: '',
            token: '',
            isAuthenticated: false,
          };
  
      default:
        return state;
    }
  };