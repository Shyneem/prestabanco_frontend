import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import LoginIcon from "@mui/icons-material/Login";
import auth from "../services/auth.service"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

const Login = () => {
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!rut || !password) {
      setMessage("Por favor, ingrese rut y contraseña");
      return;
    }

    try {
      const response = await auth({ rut, password });
      const userData = response.data;
      console.log("Respuesta de la API:", userData);

      if (userData.rut && userData.id) {
        console.log("Inicio de sesión correcto", userData);
        login(userData); // Actualiza el contexto
        navigate("/home"); // Navega al inicio
      } else {
        alert("Usuario no encontrado o credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMessage("Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <Box
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
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
              type="submit"
              style={{ marginLeft: "0.5rem" }}
              startIcon={<LoginIcon />}
            >
              Iniciar Sesión
            </Button>
          </FormControl>
        </Box>
      </Box>
      {message && <p style={{ color: "red" }}>{message}</p>}
    </form>
  );
};

export default Login;
