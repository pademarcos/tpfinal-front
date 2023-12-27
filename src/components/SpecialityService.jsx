export const getSpecialitiesList = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/specialities');
      const data = await response.json();
  
      const specialitiesObject = data && data.specialities;
  
      if (specialitiesObject) {
        return specialitiesObject.data;
      } else {
        console.error('El servidor no devolvió un objeto válido con especialidades.');
        return [];
      }
    } catch (error) {
      console.error('Error al obtener la lista de especialidades:', error);
      return [];
    }
  };