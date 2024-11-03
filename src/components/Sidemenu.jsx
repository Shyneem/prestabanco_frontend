import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PaidIcon from "@mui/icons-material/Paid";
import CalculateIcon from "@mui/icons-material/Calculate";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";


export default function Sidemenu({ open, toggleDrawer }) {


  const {isAuntenthicated} = useAuth();

  const navigate = useNavigate();

  

  const listOptions = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <ListItemButton onClick={() => navigate("/home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>

        <Divider />

        <ListItemButton onClick={() => navigate("/simulation")}>
          <ListItemIcon>
            <CalculateIcon />
          </ListItemIcon>
          <ListItemText primary="Simular crédito" />
        </ListItemButton>

        

        <ListItemButton onClick={() => navigate("/loanRequest")}>
          <ListItemIcon>
            <PaidIcon />
          </ListItemIcon>
          <ListItemText primary="Postular a crédito" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("*")}>
          <ListItemIcon>
            <CalculateIcon />
          </ListItemIcon>
          <ListItemText primary="En construcción" />
        </ListItemButton>
        <ListItemButton onClick={() => navigate("*")}>
          <ListItemIcon>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="En construcción" />
        </ListItemButton>
      </List>

      <Divider />

    
    </Box>
  );

  //if(!isAuntenthicated) return null;

  return (
    <div>
      <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
        {listOptions()}
      </Drawer>
    </div>
  );
}
