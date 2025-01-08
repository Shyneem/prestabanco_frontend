import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const SimulationResponse = () => {
  const location = useLocation();
  const simulationData = location.state?.simulationData;

  // Verificar si simulationData está disponible
  if (!simulationData) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          No hay datos disponibles
        </Typography>
      </Box>
    );
  }

  // Crear datos para la tabla
  function createData(name, loanAmount, interestRate, years, monthlyPayment) {
    return { name, loanAmount, interestRate, years, monthlyPayment };
  }

  const row = [
    createData(
      simulationData.name,
      simulationData.loanAmount,
      simulationData.interestRate,
      simulationData.years,
      simulationData.monthlyPayment
    )
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
        Resultados de la Simulación
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: '#ffffff', boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simulation results table">
          <TableHead>
            <TableRow>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Crédito total</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Tasa de interés</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Años</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Monto mensual a pagar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: '#f5f5f5', // Color de fondo de las filas
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.loanAmount}</TableCell>
                <TableCell align="right">{row.interestRate}</TableCell>
                <TableCell align="right">{row.years}</TableCell>
                <TableCell align="right">{row.monthlyPayment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SimulationResponse;