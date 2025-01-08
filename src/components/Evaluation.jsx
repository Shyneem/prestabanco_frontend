import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import evaluationService from "../services/evaluation.service";
import loanRequestService from "../services/loanRequest.service";
import fileUploadService from "../services/fileUpload.service";

const Evaluation = () => {
  const [requests, setRequests] = useState([]);
  const [files, setFiles] = useState({}); // Estado para almacenar los archivos por solicitud
  const [selectedRequestId, setSelectedRequestId] = useState(null); // Estado para almacenar la solicitud seleccionada

  const navigate = useNavigate();

  const init = () => {
    evaluationService
      .get()
      .then((response) => {
        console.log("Mostrando listado de todas las solicitudes.", response.data);
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar mostrar listado de todas las solicitudes.",
          error
        );
      });
  };

  // Función para obtener los archivos de una solicitud
  const fetchFiles = (loanRequestID) => {
    console.log(loanRequestID);
    fileUploadService
      .getFiles(loanRequestID)
      .then((response) => {
        const data = response.data;
        console.log("Archivos recibidos:", data); // Agregar log para verificar los datos recibidos
        setFiles((prevFiles) => ({
          ...prevFiles,
          [loanRequestID]: Array.isArray(data) ? data : [], // Asegúrate de que sea un arreglo
        }));
        setSelectedRequestId(loanRequestID); // Establece la solicitud seleccionada
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar obtener los archivos de la solicitud",
          error
        );
        setFiles((prevFiles) => ({
          ...prevFiles,
          [loanRequestID]: [], // Asegúrate de que sea un arreglo en caso de error
        }));
      });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (selectedRequestId !== null) {
      console.log(`Archivos actualizados para la solicitud ${selectedRequestId}:`, files[selectedRequestId]);
    }
  }, [files, selectedRequestId]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Está seguro que desea borrar esta solicitud?"
    );
    if (confirmDelete) {
      loanRequestService
        .remove(id)
        .then((response) => {
          console.log("La solicitud ha sido eliminada.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar eliminar la solicitud",
            error
          );
        });
    }
  };

  const handleStatusChange = (id, statusUpdate) => {
    loanRequestService
      .update(id, statusUpdate)
      .then((response) => {
        console.log("El estado de la solicitud ha sido actualizado.", response.data);
        init();
      })
      .catch((error) => {
        console.log(
          "Se ha producido un error al intentar actualizar el estado de la solicitud",
          error
        );
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
        Evaluación de Solicitudes de Préstamo
      </Typography>
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                Archivos
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow
                key={request.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{request.rut}</TableCell>
                <TableCell align="right">{request.years}</TableCell>
                <TableCell align="right">{request.interestRate}</TableCell>
                <TableCell align="right">{request.loanAmount}</TableCell>
                <TableCell align="right">{request.totalCost}</TableCell>
                <TableCell align="right">
                  <FormControl variant="standard" fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={request.state}
                      label="Estado"
                      onChange={(e) => handleStatusChange(request.id, e.target.value)}
                    >
                      <MenuItem value="En revisión inicial">En revisión inicial</MenuItem>
                      <MenuItem value="Pendiente de Documentación">Pendiente de Documentación</MenuItem>
                      <MenuItem value="En Evaluación">En Evaluación</MenuItem>
                      <MenuItem value="Pre-Aprobada">Pre-Aprobada</MenuItem>
                      <MenuItem value="En Aprobación Final">En Aprobación Final</MenuItem>
                      <MenuItem value="Aprobada">Aprobada</MenuItem>
                      <MenuItem value="Rechazada">Rechazado</MenuItem>
                      <MenuItem value="Cancelada por el Cliente">Cancelada por el Cliente</MenuItem>
                      <MenuItem value="En Desembolso">En Desembolso</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => fetchFiles(request.id)}
                  >
                    Mostrar Archivos
                  </Button>
                  {selectedRequestId === request.id && Array.isArray(files[request.id]) && files[request.id].length > 0 && (
                    <Box sx={{ mt: 1 }}>
                      {files[request.id].map((file, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            component="a"
                            href={file.fileUri}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.fileName}
                          </Button>
                        </Box>
                      ))}
                    </Box>
                  )}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(request.id)}
                  >
                    Eliminar
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Evaluation;