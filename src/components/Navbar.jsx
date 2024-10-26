import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidemenu from "./Sidemenu";
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setOpen(open);
  };
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Presta Banco: Obten tus créditos con nosotros!
          </Typography>
          <ButtonGroup variant="contained" aria-label="Basic button group">

            
            <Link
              to="/login"
                style={{ textDecoration: "none", marginBottom: "1rem" }}
            >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LoginIcon/>}
                >
                  Iniciar sesión
                </Button>
            </Link>
          


            <Link
              to="/register"
              style={{ textDecoration: "none", marginBottom: "1rem" }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<AssignmentIcon />}
              >
                Regístrate
              </Button>
            </Link>

          </ButtonGroup>

        </Toolbar>
      </AppBar>

      <Sidemenu open={open} toggleDrawer={toggleDrawer}></Sidemenu>
    </Box>
  );
}
