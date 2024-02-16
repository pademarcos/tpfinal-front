export const setLoginData = (username, token, userId) => {
  sessionStorage.setItem('isAuthenticated', 'true');
  sessionStorage.setItem('username', username);
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('userId', userId);
  return { type: 'SET_LOGIN_DATA', payload: { username, token, userId } };
};

export const clearLoginData = () => {
  sessionStorage.removeItem('isAuthenticated');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userId');
  return { type: 'CLEAR_LOGIN_DATA' };
};

  export const setUsername = (username) => {
    localStorage.setItem('username', username);
    return { type: 'SET_USERNAME', payload: username };
  };
  
  export const setPassword = (password) => {
    return { type: 'SET_PASSWORD', payload: password };
  };