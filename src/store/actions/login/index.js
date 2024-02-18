import { jwtDecode } from 'jwt-decode';

export const clearLoginData = () => {
  sessionStorage.removeItem('isAdmin');
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

  export const login = (username, password) => async dispatch => {
    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Error en la autenticación');
      }

      const tokenData = await response.json();
      const token = tokenData.token; 

      const decodedToken = jwtDecode(token);

      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('isAdmin', decodedToken.admin);
      sessionStorage.setItem('userId', decodedToken.userId);
      dispatch( { type: 'SET_LOGIN_DATA', payload: { username, token, isAdmin: decodedToken.admin, userId: decodedToken.userId } });
    
    } catch (error) {
      console.error('Error de inicio de sesión:', error.message);
    }
  };

  // export const clearLogin = () => {
  //   return { type: 'CLEAR_LOGIN' };
  // };