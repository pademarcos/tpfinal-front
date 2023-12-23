import './App.css';
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from "./components/Login";
import Admin from "./pages/Admin";
import Paciente from "./pages/Paciente";
import DoctorDetails from './components/DoctorDetails';

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route path="/paciente" element={<Paciente />} />
      <Route path="/doctor/:doctorId" element={<DoctorDetails />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;

