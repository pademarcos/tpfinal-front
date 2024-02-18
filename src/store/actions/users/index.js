export const fetchUsers = (page, pageSize) => async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/all-users?page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data.users });

    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
      dispatch({ type: 'FETCH_USERS_FAILURE', payload: [] });
    }
  };
   
  export const startUsersLoading = () => {
    return {type: 'START_USERS_LOADING'}
  };

  