import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Stack
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import AddIcon from "@mui/icons-material/Add";
import feeService from "../services/fee.service";
import reservationService from "../services/reservation.service";
import ParticipanteForm from "./ParticipanteForm";
import { es } from "date-fns/locale";

const ReservaForm = ({ onSubmit }) => {
  const [fechaHora, setFechaHora] = useState(new Date());
  const [participantes, setParticipantes] = useState([]);
  const [tarifas, setTarifas] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    feeService.getFees().then((res) => setTarifas(res.data));
  }, []);

  const agregarParticipante = () => {
    setParticipantes([
      ...participantes,
      { name: "", birthday: null, rut: "", email: "", idFee: "" }
    ]);
  };

  const actualizarParticipante = (index, data) => {
    const nuevos = [...participantes];
    nuevos[index] = data;
    setParticipantes(nuevos);
  };

  const enviarReserva = async () => {
    setSubmitting(true);
    try {
      const payload = {
        fechaHora,
        participantes,
      };
      const res = await reservationService.create(payload);
      onSubmit(res.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      alert("Ocurrió un error al enviar la reserva.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 680, margin: "auto" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <DateTimePicker
          label="Fecha y hora de la reserva"
          value={fechaHora}
          onChange={setFechaHora}
          inputFormat="dd/MM/yyyy HH:mm"
          renderInput={(params) => <TextField fullWidth {...params} sx={{ mb: 2 }} />}
        />
      </LocalizationProvider>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Participantes
      </Typography>

      <Stack spacing={2}>
        {participantes.map((p, index) => (
          <ParticipanteForm
            key={index}
            index={index}
            participante={p}
            onChange={(data) => actualizarParticipante(index, data)}
            tarifas={tarifas}
          />
        ))}
      </Stack>

      <Button
        startIcon={<AddIcon />}
        onClick={agregarParticipante}
        color="primary"
        variant="outlined"
        size="large"
        sx={{ mt: 2, mb: 1 }}
      >
        Agregar participante
      </Button>

      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 3 }}
        onClick={enviarReserva}
        disabled={!participantes.length || submitting}
      >
        Confirmar reserva
      </Button>
    </Box>
  );
};

export default ReservaForm;