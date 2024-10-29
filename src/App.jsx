import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import NotFound from './components/NotFound';
import Register from "./components/Register";
import Login from "./components/Login";
import Simulation from "./components/Simulation";
import Sidemenu from "./components/Sidemenu";
import { useAuth } from "./contexts/auth.context";
import { useState } from 'react';
import SimulationResponse from './components/SimulationResponse';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
