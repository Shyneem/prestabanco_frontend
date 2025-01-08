import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { FormHelperText } from '@mui/material';
import loanRequestService from "../services/loanRequest.service";
import fileUploadService from '../services/fileUpload.service';
import { useAuth } from "../contexts/auth.context";

const PrimeraVivienda = () => {
  const [errors, setErrors] = useState({});
  const [rut, setRut] = useState("");
  const [loanAmount, setLoanAmount] = useState(10000000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [years, setYears] = useState(20);
  const { id } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
  const { user } = useAuth();

  const handleFileChange = (index, event) => {
    const files = [...selectedFiles];
    files[index] = event.target.files[0]; // Guardar el archivo en la posición correspondiente
    setSelectedFiles(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!rut) newErrors.rut = "Este campo es obligatorio.";
    if (!loanAmount) newErrors.loanAmount = "Este campo es obligatorio.";
    if (!interestRate) newErrors.interestRate = "Este campo es obligatorio.";
    if (!years) newErrors.years = "Este campo es obligatorio.";
    if (selectedFiles.some(file => file === null)) newErrors.files = "Ingrese los 3 documentos pedidos.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const loanRequest = {
      rut,
      loanAmount: parseInt(loanAmount, 10),
      interestRate: parseFloat(interestRate),
      years: parseInt(years, 10),
      id
    };

    try {
      // Enviar la solicitud de préstamo para obtener el ID
      loanRequestService
        .create(user.id, loanRequest)
        .then((response) => {
          console.log("Solicitud enviada", response.data);
          const loanRequestId = response.data.id;
          const formData = new FormData();
          for (const file of selectedFiles) {
            formData.append("files", file);
          }
          formData.append("loanRequestId", loanRequestId);

          console.log(formData);
          fileUploadService
            .create(formData)
            .then((response) => {
              console.log("Archivos enviados", response.data);
              alert("Solicitud enviada, revisar estado en el menú Solicitudes");
            });
        })
        .catch((error) => {
          console.log("Ha ocurrido un error", error);
        });
    } catch (error) {
      console.log("Ha ocurrido un error", error);
    }
  };

  return (
    <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#f7f7f7' }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
          Solicitud de Préstamo para Primera Vivienda
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" error={!!errors.rut} required>
              <TextField
                label="Rut"
                id="rut"
                value={rut}
                helperText={errors.rut ? errors.rut : "Ej. 12345678-9"}
                onChange={(e) => setRut(e.target.value)}
              />
              {errors.rut && <FormHelperText>{errors.rut}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" error={!!errors.interestRate} required>
              <TextField
                label="Tasa de interés"
                id="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                helperText={errors.interestRate}
              />
              {errors.interestRate && <FormHelperText>{errors.interestRate}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" error={!!errors.years} required>
              <TextField
                label="Cantidad de años a pagar"
                id="years"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                helperText={errors.years}
              />
              {errors.years && <FormHelperText>{errors.years}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined" error={!!errors.loanAmount} required>
              <InputLabel htmlFor="outlined-adornment-amount">Total crédito</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Total crédito"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
              {errors.loanAmount && <FormHelperText>{errors.loanAmount}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              type="file"
              variant="filled"
              onChange={(event) => handleFileChange(0, event)}
              helperText="Carnet de identidad por ambos lados"
              error={!!errors.files}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              type="file"
              variant="filled"
              onChange={(event) => handleFileChange(1, event)}
              helperText="Historial Crediticio"
              error={!!errors.files}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              type="file"
              variant="filled"
              onChange={(event) => handleFileChange(2, event)}
              helperText="Ingresos mensuales"
              error={!!errors.files}
            />
            {errors.files && <FormHelperText error>{errors.files}</FormHelperText>}
          </Grid>
          <Grid item xs={12} md={12}>
            <Divider sx={{ mb: 2 }} />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Enviar Solicitud
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PrimeraVivienda;