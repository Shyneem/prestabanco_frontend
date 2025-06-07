import React, { useState } from "react";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import ReservaForm from "../components/ReservaForm";

const NuevaReserva = () => {
  const [reservaData, setReservaData] = useState(null);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 3 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700 }}>
          Crear nueva reserva
        </Typography>
      </Box>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
        {!reservaData ? (
          <ReservaForm onSubmit={setReservaData} />
        ) : (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h5" color="success.main" sx={{ fontWeight: 700 }}>
              ¡Reserva confirmada!
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Tu código de reserva es:{" "}
              <strong style={{ fontSize: 22 }}>{reservaData.codigoReserva}</strong>
            </Typography>
            <Button
              sx={{ mt: 4 }}
              variant="contained"
              color="primary"
              onClick={() => setReservaData(null)}
            >
              Realizar otra reserva
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default NuevaReserva;