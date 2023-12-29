import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoctorsList, addDoctor, updateDoctor, getDoctorDetails } from '../components/DoctorService';
import { getSpecialitiesList } from '../components/SpecialityService';
import { addAuthorizationHeader } from '../components/Login';

const PAGE_SIZE = 10;

const Admin = () => {
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    speciality: '',
  });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorsList = await getDoctorsList(currentPage, PAGE_SIZE);
        setDoctors(doctorsList.doctors);
        setTotalPages(doctorsList.totalPages);
      } catch (error) {
        console.error('Error al obtener la lista de doctores:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const specialitiesList = await getSpecialitiesList();
        setSpecialities(specialitiesList);
      } catch (error) {
        console.error('Error al obtener la lista de especialidades:', error);
      }
    };

    fetchSpecialities();
  }, [currentPage]);

  const handleEditClick = async (doctorId) => {
    try {
      const details = await getDoctorDetails(doctorId);
      setSelectedDoctor(details.doctor);
      setIsEditing(true);
    } catch (error) {
      console.error('Error al cargar los detalles del médico:', error);
    }
  };

  const handleChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (isEditing) {
      setSelectedDoctor((prevDoctor) => ({
        ...prevDoctor,
        [targetName]: targetValue,
      }));
    } else {
      setNewDoctor((prevDoctor) => ({
        ...prevDoctor,
        [targetName]: targetValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem('token');

      if (isEditing) {
        await updateDoctor(selectedDoctor._id, selectedDoctor, token);
      } else {
        await addDoctor(addAuthorizationHeader(newDoctor, token), token);
      }

      // Actualizar la lista después de agregar o modificar el médico
      const updatedDoctorsList = await getDoctorsList(currentPage, PAGE_SIZE);
      setDoctors(updatedDoctorsList.doctors);
      setTotalPages(updatedDoctorsList.totalPages);

      setNewDoctor({
        name: '',
        speciality: '',
      });
      setSelectedDoctor(null);

      setIsEditing(false);
      alert(isEditing ? 'Médico modificado con éxito' : 'Médico agregado con éxito');
    } catch (error) {
      console.error('Error al agregar/modificar el médico:', error);
      alert('Error al agregar/modificar el médico. Por favor, inténtelo de nuevo.');
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <h2>Lista de Doctores Disponibles </h2>
      <ul>
        {doctors && doctors.length > 0 ? (
          doctors.map((doctor) => (
            <li key={doctor._id}>
              <strong>{doctor.name}</strong> - Especialidad: {doctor.speciality.name}{' '}
              <Link to={`/doctor/${doctor._id}`}>Ver Detalles</Link>
              <button onClick={() => handleEditClick(doctor._id)}>Modificar</button>
            </li>
          ))
        ) : (
          <p>No hay doctores disponibles.</p>
        )}
      </ul>

      <div>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Siguiente
        </button>
      </div>

      <h2>{isEditing ? 'Modificar Médico' : 'Agregar Nuevo Médico'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Médico:
          <input
            type="text"
            name="name"
            value={isEditing && selectedDoctor ? selectedDoctor.name : newDoctor.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Especialidad:
          <select
            name="speciality"
            value={isEditing && selectedDoctor ? selectedDoctor.speciality.name : newDoctor.speciality}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una especialidad</option>
            {specialities.map((speciality) => (
              <option key={speciality._id} value={speciality.name}>
                {speciality.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">{isEditing ? 'Aceptar Modificación' : 'Agregar Médico'}</button>
      </form>
    </div>
  );
};

export default Admin;
