export const setLoginData = (username, token) => {
    return { type: 'SET_LOGIN_DATA', payload: { username, token } };
  };
  
  export const clearLoginData = () => {
    return { type: 'CLEAR_LOGIN_DATA' };
  };