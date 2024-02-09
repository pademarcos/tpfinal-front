export const setLoginData = (username, token) => {
  localStorage.setItem('isAuthenticated', 'true');
  localStorage.setItem('username', username);
  localStorage.setItem('token', token);
  return { type: 'SET_LOGIN_DATA', payload: { username, token } };
  };
  
  export const clearLoginData = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    return { type: 'CLEAR_LOGIN_DATA' };
  };

  export const setUsername = (username) => {
    localStorage.setItem('username', username);
    return { type: 'SET_USERNAME', payload: username };
  };
  
  export const setPassword = (password) => {
    return { type: 'SET_PASSWORD', payload: password };
  };