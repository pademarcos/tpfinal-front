import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoctorsList } from '../components/DoctorService';

const Paciente = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsList = await getDoctorsList();
      setDoctors(doctorsList);
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      <h1>Pacientes</h1>
      <h2>Lista de Doctores Disponibles</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor._id}>
            <strong>{doctor.name}</strong> - Especialidad: {doctor.speciality.name}{' '}
            <Link to={`/doctor/${doctor._id}`}>Ver Detalles</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paciente;
