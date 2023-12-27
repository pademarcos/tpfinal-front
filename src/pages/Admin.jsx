import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoctorsList, addDoctor } from '../components/DoctorService';
import { getSpecialitiesList } from '../components/SpecialityService';

const Admin = () => {
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    speciality: '',
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsList = await getDoctorsList();
      setDoctors(doctorsList);
    };

    const fetchSpecialities = async () => {
      const specialitiesList = await getSpecialitiesList();
      setSpecialities(specialitiesList);
    };

    fetchDoctors();
    fetchSpecialities();
  }, []);

  const handleChange = (e) => {
    setNewDoctor({
      ...newDoctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem('token');
      await addDoctor(newDoctor, token);

      const updatedDoctorsList = await getDoctorsList();
      setDoctors(updatedDoctorsList);

      setNewDoctor({
        name: '',
        speciality: '',
      });
    } catch (error) {
      console.error('Error al agregar el médico:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Lista de Doctores Disponibles </h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor._id}>
            <strong>{doctor.name}</strong> - Especialidad: {doctor.speciality.name}{' '}
            <Link to={`/doctor/${doctor._id}`}>Ver Detalles</Link>
          </li>
        ))}
      </ul>

      
      <h2>Agregar Nuevo Médico</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Médico:
          <input
            type="text"
            name="name"
            value={newDoctor.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Especialidad:
          <select
            name="speciality"
            value={newDoctor.speciality}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una especialidad</option>
            {specialities.map(speciality => (
              <option key={speciality._id} value={speciality.name}>
                {speciality.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Agregar Médico</button>
      </form>
    </div>
  );
};

export default Admin;
