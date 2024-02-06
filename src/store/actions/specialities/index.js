export const fetchSpecialities = () => async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3001/api/specialities');
      const data = await response.json();
      
      dispatch({ type: 'FETCH_SPECIALITIES', payload: data.specialities.data });

    } catch (error) {
      console.error('Error al obtener la lista de especialidades:', error);
    }
  };
  