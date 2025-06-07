import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

import ReservaForm from './components/ReservaForm';
import NuevaReserva from './pages/NuevaReserva';
import ParticipanteForm from './components/ParticipanteForm';


const Home = () => <div>Home</div>;
const NotFound = () => <div>404 Not Found</div>;
const Login = () => <div>Login</div>;
const Reserva = () => <div>Reserva</div>;

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/reserva" element={<ReservaForm />} />
          <Route path="/nueva-reserva" element={<NuevaReserva />} />
          <Route path="/participantes-form" element={<ParticipanteForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;