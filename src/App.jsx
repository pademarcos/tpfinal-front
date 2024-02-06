import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Paciente from "./pages/Paciente";
import DoctorDetails from './pages/DoctorDetails';

function App() {
  return (
    <Routes> 
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/paciente" element={<Paciente />} />
      <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
    </Routes>
  );
}

export default App;

