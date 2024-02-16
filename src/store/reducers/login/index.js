const initialState = {
  username: sessionStorage.getItem('username') || '',
  password: '',
  token: sessionStorage.getItem('token') || '',
  isAuthenticated: sessionStorage.getItem('isAuthenticated') === 'true',
  isAdmin: sessionStorage.getItem('isAdmin') === 'true',
  userId: sessionStorage.getItem('userId') || '',
};
  
  export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOGIN_DATA':
        return {
          ...state,
          username: action.payload.username,
          token: action.payload.token,
          isAdmin: action.payload.isAdmin,
          userId: action.payload.userId,
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
            userId: '',
            isAuthenticated: false,
          };
  
      default:
        return state;
    }
  };