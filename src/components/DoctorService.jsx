export const getDoctorsList = async (page, pageSize) => {
  try {
    const response = await fetch(`http://localhost:3001/api/doctors?page=${page}&pageSize=${pageSize}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener la lista de doctores:', error);
    return { doctors: [], totalPages: {} }; 
  }
};
  
  export const getDoctorDetails = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/doctors/details/${doctorId}`);
      const data = await response.json();
     
      return data; 
      
    } catch (error) {
      console.error(`Error al obtener los detalles del médico con ID ${doctorId}:`, error);
      return { doctor: {}, appointments: {} };
    }
  };

  export const addDoctor = async (doctorData, token) => {
    try {
      
      const response = await fetch('http://localhost:3001/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(doctorData),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al agregar el médico:', error);
      throw error; 
    }
  };

  export const updateDoctor = async (doctorId, doctorData, token) => {
    try {
      const response = await fetch(`http://localhost:3001/api/doctors/${doctorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(doctorData),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al modificar el médico:', error);
      throw error;
    }
  };