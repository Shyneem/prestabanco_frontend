import React from "react";
import { TextField, Box, MenuItem, Grid } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from "date-fns/locale";

const ParticipanteForm = ({
  index,
  onChange,
  tarifas,
  participante = { name: "", birthday: null, rut: "", email: "", idFee: "" }
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...participante, [name]: value });
  };

  const handleDateChange = (date) => {
    onChange({ ...participante, birthday: date });
  };

  return (
    <Box sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 2, background: "#f8fafc", boxShadow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            label={`Nombre del Participante #${index + 1}`}
            value={participante.name ?? ""}
            onChange={handleChange}
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DatePicker
              label="Fecha de nacimiento"
              value={participante.birthday}
              onChange={handleDateChange}
              inputFormat="dd/MM/yyyy"
              mask="__/__/____"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="rut"
            label="RUT"
            value={participante.rut ?? ""}
            onChange={handleChange}
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Email"
            value={participante.email ?? ""}
            onChange={handleChange}
            type="email"
            fullWidth
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            select
            name="idFee"
            label="Tarifa"
            value={participante.idFee ?? ""}
            onChange={handleChange}
            fullWidth
          >
            {tarifas.map((tarifa) => (
              <MenuItem key={tarifa.id} value={tarifa.id}>
                {tarifa.laps} vueltas - ${tarifa.price} - {tarifa.reservation_time ?? tarifa.reservationTime} minutos
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ParticipanteForm;