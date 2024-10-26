import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Navbar from "./components/Navbar";
import Home from './components/Home';
import NotFound from './components/NotFound';
import Register from "./components/Register";
import Login from "./components/Login";
/*import EmployeeList from './components/EmployeesList';
import AddEditEmployee from './components/AddEditEmployee';
import ExtraHoursList from './components/ExtraHoursList';
import AddEditExtraHours from './components/AddEditExtraHours';
import PaycheckList from './components/PaycheckList';
import PaycheckCalculate from './components/PaycheckCalculate';
import AnualReport from './components/AnualReport';
*/


function App() {

  return (
    <Router>
        <div className="container">
        <Navbar></Navbar>
          <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="*" element={<NotFound/>} />
            <Route path= "/login" element={<Login/>} /> 
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </div>
    </Router>
);
}

export default App
