import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDoctorDetails } from './DoctorService';

const DoctorDetails = () => {
  
  const { doctorId } = useParams();
  const [doctorDetails, setDoctorDetails] = useState({ doctor: {}, appointments: {} });
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      const details = await getDoctorDetails(doctorId); 
      setDoctorDetails(details);
    };
    fetchDoctorDetails();
  }, [doctorId]);

  return (
    <div>
      <h2>Detalles del Médico</h2>
      {doctorDetails.doctor ? (
        <>
          <p>Nombre del Médico: {doctorDetails.doctor.name || 'Nombre no disponible'}</p>
          
          <p>Especialidad: {doctorDetails.doctor.speciality ? doctorDetails.doctor.speciality.name : 'Especialidad no disponible'}</p>


          <h3>Turnos Disponibles</h3>
          {doctorDetails.appointments?.data ? (
            <ul>
            {doctorDetails.appointments.data.map(appointment => (
              <li key={appointment._id}>
                Fecha y Hora: {new Date(appointment.date).toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
              </li>
            ))}
          </ul>
          ) : (
            <p>No hay turnos disponibles</p>
          )}
        </>
      ) : (
        <p>Cargando detalles...</p>
      )}
    </div>
  );
};

export default DoctorDetails;
