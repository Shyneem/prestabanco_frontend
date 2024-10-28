import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import NotFound from './components/NotFound';
import Register from "./components/Register";
import Login from "./components/Login";
import { useAuth } from "./contexts/auth.context";
import Sidemenu from "./components/Sidemenu";
import { useState } from 'react';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
