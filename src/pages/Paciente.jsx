import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDoctorsList } from '../components/DoctorService';

const Paciente = () => {
  const [doctors, setDoctors] = useState([]);
  const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPages: 1 });

  useEffect(() => {
    const fetchDoctors = async () => {
      const { doctors: doctorsList, pageInfo: fetchedPageInfo } = await getDoctorsList(pageInfo.currentPage, 10); 
      setDoctors(doctorsList);
      setPageInfo(fetchedPageInfo);
    };

    fetchDoctors();
  }, [pageInfo.currentPage]);

  const handlePageChange = (newPage) => {
    setPageInfo((prevPageInfo) => ({
      ...prevPageInfo,
      currentPage: newPage,
    }));
  };

  return (
    <div>
      <h1>Pacientes</h1>
      <h2>Lista de Doctores Disponibles</h2>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            <strong>{doctor.name}</strong> - Especialidad: {doctor.speciality.name}{' '}
            <Link to={`/doctor/${doctor._id}`}>Ver Detalles</Link>
          </li>
        ))}
      </ul>
      <div>
        <button disabled={pageInfo.currentPage === 1} onClick={() => handlePageChange(pageInfo.currentPage - 1)}>
          Anterior
        </button>
        <span>Página {pageInfo.currentPage} de {pageInfo.totalPages}</span>
        <button disabled={pageInfo.currentPage === pageInfo.totalPages} onClick={() => handlePageChange(pageInfo.currentPage + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Paciente;
