export const fetchDoctors = (page, pageSize) => async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/api/doctors?page=${page}&pageSize=${pageSize}`);
      const data = await response.json();
      dispatch({ type: 'FETCH_DOCTORS', payload: data });

    } catch (error) {
      console.error('Error al obtener la lista de doctores:', error);
      dispatch({ type: 'FETCH_DOCTORS', payload: [] });
    }
  };

export const startDoctorsLoading = () => {
  return {type: 'START_LOADING'}
};

export const addDoctor = (newDoctor, token) => async dispatch => {
  try{
      await fetch('http://localhost:3001/api/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newDoctor),
    });

      dispatch({type: 'START_LOADING'})
  } catch (error) {
    console.error('Error al agregar el médico:', error);
    throw error; 
  }
};

export const getDoctorDetails = (doctorId) => async dispatch => {
  try {
    const response = await fetch(`http://localhost:3001/api/doctors/details/${doctorId}`);
    const data = await response.json();
    dispatch({ type: 'GET_DETAILS', payload: data })
    
  } catch (error) {
    console.error(`Error al obtener los detalles del médico con ID ${doctorId}:`, error);
    dispatch({ type: 'GET_DETAILS', payload: null })
  }
};

export const updateDoctor = (doctorData, token) => async (dispatch) => {
    try {
      await fetch(`http://localhost:3001/api/doctors/${doctorData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(doctorData),
      });
      dispatch({type: 'START_LOADING'})
    } catch (error) {
      console.error('Error al modificar el médico:', error);
      throw error;
    }
  };
  
  export const fetchDoctorsBySpeciality = (specialityName) => async (dispatch) => {
    try {
      dispatch(startDoctorsLoading());
  
      const response = await fetch(`http://localhost:3001/api/doctors/speciality/${specialityName}`);
      const data = await response.json();
      
      dispatch({ type: 'FETCH_DOCTORS_BY_SPECIALITY', payload: data });
    } catch (error) {
      console.error('Error al obtener la lista de doctores por especialidad:', error);
      dispatch({ type: 'FETCH_DOCTORS_BY_SPECIALITY', payload: [] }); 
    }
  };
