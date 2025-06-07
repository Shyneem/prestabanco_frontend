import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';

<<<<<<< HEAD
import ReservaForm from './components/ReservaForm';
import NuevaReserva from './pages/NuevaReserva';
import ParticipanteForm from './components/ParticipanteForm';


const Home = () => <div>Home</div>;
const NotFound = () => <div>404 Not Found</div>;
const Login = () => <div>Login</div>;
const Reserva = () => <div>Reserva</div>;
=======
//Vistas de componentes
import Navbar from "./components/Navbar";
import Home from './components/Home';
import NotFound from './components/NotFound';
import Register from "./components/Register";
import Login from "./components/Login";
import Simulation from "./components/Simulation";
import Sidemenu from "./components/Sidemenu";
import LoanRequest from "./components/LoanRequest"
import SimulationResponse from './components/SimulationResponse';
import PrimeraVivienda from "./components/PrimeraVivienda";
import SegundaVivienda from "./components/SegundaVivienda";
import ComercialRealState from './components/ComercialRealState';
import Remodeling from './components/Remodeling';
import LoanRequestList from './components/LoanRequestList';
import Evaluation from './components/Evaluation';
>>>>>>> 508e415014064028de6068eb34a40dfa186b20ff

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
<<<<<<< HEAD
          <Route path="/reserva" element={<ReservaForm />} />
          <Route path="/nueva-reserva" element={<NuevaReserva />} />
          <Route path="/participantes-form" element={<ParticipanteForm />} />
=======
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/simulation" element={<Simulation/>}/>
          <Route path="/simulationResponse" element={<SimulationResponse/>}/>
          <Route path="/loanRequest" element={<LoanRequest/>}/>
          <Route path="/primeraVivienda" element={<PrimeraVivienda/>}/>
          <Route path="/segundaVivienda" element={<SegundaVivienda/>}/>
          <Route path="/comercialRealState" element={<ComercialRealState/>}/>
          <Route path="/remodeling" element={<Remodeling/>}/>
          <Route path="/loanRequestList" element={<LoanRequestList/>}/>
          <Route path="/evaluation" element={<Evaluation/>}/>
>>>>>>> 508e415014064028de6068eb34a40dfa186b20ff
        </Routes>
      </div>
    </Router>
  );
}

export default App;