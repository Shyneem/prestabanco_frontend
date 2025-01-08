import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAuth } from "./contexts/auth.context";
import { useState } from 'react';

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

function App() {
  const { isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Router>
      <div className="container">
        <Navbar toggleDrawer={toggleDrawer} />
        {isAuthenticated && <Sidemenu open={drawerOpen} toggleDrawer={toggleDrawer} />}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
