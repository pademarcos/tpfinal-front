export const getDoctorsList = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/doctors');
      const data = await response.json();
      return data.doctors;
    } catch (error) {
      console.error('Error al obtener la lista de doctores:', error);
      return { doctor: {}, appointments: {} };
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

  export const addDoctor = async (doctorData) => {
    try {
      const response = await fetch('http://localhost:3001/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctorData),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al agregar el médico:', error);
      throw error; // Puedes decidir manejar el error de otra manera según tus necesidades
    }
  };