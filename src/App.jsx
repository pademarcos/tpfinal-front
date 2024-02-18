import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Users from "./pages/Users";
import Paciente from "./pages/Paciente";
import DoctorDetails from './pages/DoctorDetails';
import DoctorList from './pages/DoctorList';
import RecoverPassword from './pages/RecoverPassword';
import MisTurnos from './pages/MisTurnos';

function App() {
  return (
    <Routes> 
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/users" element={<Users />} />
      <Route path="/paciente" element={<Paciente />} />
      <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
      <Route path="/paciente/doctor_list/:doctorId" element={<DoctorList />} />
      <Route path="/RecoverPassword" element={<RecoverPassword />} />
      <Route path="/paciente/mis-turnos" element={<MisTurnos />} />
    </Routes>
  );
}

export default App;

