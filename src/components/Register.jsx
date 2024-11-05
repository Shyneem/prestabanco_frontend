import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import Divider from '@mui/material/Divider';
import * as React from 'react';

const Register = () => {
  const [rut, setRut] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const saveUser = (e) => {
    e.preventDefault();
    
    const user = { rut, name, lastname, id, password };
    console.log(user)
    if (id) {
      // Actualizar Datos usuario
      userService
        .update(user)
        .then((response) => {
          console.log("Usuario ha sido actualizado.", response.data);
          //navigate("/home");
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar actualizar datos del usuario.", error);
        });
    } else {
      // Crear nuevo usuario
      userService
        .create(user)
        .then((response) => {
          console.log("Usuario ha sido añadido.", response.data);
          navigate("/home");
        })
        .catch((error) => {
          console.log("Ha ocurrido un error al intentar crear nuevo usuario.", error);
        });
    }
        
  };



  return (
    <form onSubmit={saveUser}>
      <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center"
      >

    
     

        <FormControl fullWidth>
          <TextField
            id="rut"
            label="Rut"
            value={rut}
            variant="standard"
            onChange={(e) => setRut(e.target.value)}
            helperText="Ej. 12345678-9"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="name"
            label="Nombre"
            value={name}
            variant="standard"
            helperText="Ej. Jose"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="lastname"
            label="Apellido"
            type="text"
            value={lastname}
            variant="standard"
            onChange={(e) => setLastname(e.target.value)}
            helperText="Ej. Valenzuela"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="password"
            label="Contraseña"
            type="password"
            value={password}
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        
        <Divider />
        <Box>
            <FormControl>
            
              <Button
                  variant="contained"
                  color="info"
                  type="submit"
                  display= "flex"
                  style={{ marginLeft: "0.5rem" }}
                  startIcon={<SaveIcon />}
              >
                  
                  Registrar
              </Button>
            </FormControl>
        </Box>

       
        
      </Box>
    </form>
  );
};

export default Register;
