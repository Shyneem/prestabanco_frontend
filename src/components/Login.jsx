import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import auth from "../services/auth.service"; 
import { useNavigate } from "react-router-dom";
import {useAuth} from "../contexts/auth.context";





const Login = () => {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 


  const {login} = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = { rut, password };


    auth(user) 
      .then((response) => {
        if (response.data.rut != null && response.data.id != null) {
          console.log("Inicio de sesión correcto", response.data);
          login(response.data);
          navigate("/home");
        }
       else {
        // Si el rut o id son null, lanzar un error
        alert("Usuario no encontrado o credenciales incorrectas")
      }
        
        
      })
      .catch((error) => {
        console.log("Ha ocurrido un error en el inicio de sesión", error);
        setMessage("Error al iniciar sesión");
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <Box
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        justifyContent="center"
        display="flex"
      >
        <FormControl>
          <TextField 
            id="rut" 
            label="Rut"
            value={rut} 
            variant="standard" 
            helperText="Ej. 12345678-9"
            onChange={(e) => setRut(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <TextField 
            id="password" 
            label="Contraseña"
            value={password} 
            variant="standard" 
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        
        <Box>
          <FormControl>
            <Button
              variant="contained"
              color="info"
              display="flex"
              type = "submit"
              style={{ marginLeft: "0.5rem" }}
              startIcon={<LoginIcon />}
            >
              Iniciar Sesión
            </Button>
          </FormControl>
        </Box>
      </Box>
    </form>
  );
};

export default Login;
