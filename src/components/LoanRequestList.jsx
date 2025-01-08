import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loanRequestService from "../services/loanRequest.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../contexts/auth.context";

const LoanRequestList = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  const init = () => {
    loanRequestService
      .get(user.id)
      .then((response) => {
        console.log("Mostrando listado de todas las solicitudes.", response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.log("Se ha producido un error al intentar mostrar listado de todas las solicitudes.", error);
      });
  };

  useEffect(() => {
    init();
  }, []);

  const handleDelete = (id) => {
    console.log("Printing id", id);
    const confirmDelete = window.confirm("¿Esta seguro que desea borrar esta solicitud?");
    if (confirmDelete) {
      loanRequestService
        .remove(id)
        .then((response) => {
          console.log("La solicitud ha sido eliminada.", response.data);
          init();
        })
        .catch((error) => {
          console.log("Se ha producido un error al intentar eliminar la solicitud", error);
        });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
        Lista de Solicitudes de Préstamo
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Rut
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Años
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Tasa de interés
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Monto del préstamo
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Pago total estimado
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Estado de la solicitud
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell align="left">{request.rut}</TableCell>
                <TableCell align="right">{request.years}</TableCell>
                <TableCell align="right">{request.interestRate}</TableCell>
                <TableCell align="right">{request.loanAmount}</TableCell>
                <TableCell align="right">{request.totalCost}</TableCell>
                <TableCell align="right">{request.state}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(request.id)}
                    startIcon={<DeleteIcon />}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LoanRequestList;