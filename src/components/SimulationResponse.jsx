import * as React from 'react';
import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useLocation } from 'react-router-dom';





    



const SimulationResponse = () => {
    
    const location = useLocation();
    const simulationData = location.state?.simulationData;


    function createData(name, loanAmount, interestRate, years, monthlyPayment) {
        return { name, loanAmount, interestRate, years, monthlyPayment };
      }
    
    
    const row =[
        createData(simulationData.name,
            simulationData.loanAmount,
            simulationData.interestRate,
            simulationData.years,
            simulationData.monthlyPayment)
        ];
    
        return (
            <TableContainer component={Paper} sx={{ backgroundColor: '#424242' }}>
              <Table sx={{ minWidth: 650 }} aria-label="dark table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right" sx={{ color: '#ffffff' }}>Nombre</TableCell>
                    <TableCell align="right" sx={{ color: '#ffffff' }}>Crédito total&nbsp;</TableCell>
                    <TableCell align="right" sx={{ color: '#ffffff' }}>Tasa de interés&nbsp;</TableCell>
                    <TableCell align="right" sx={{ color: '#ffffff' }}>Años&nbsp;</TableCell>
                    <TableCell align="right" sx={{ color: '#ffffff' }}>Monto mensual a pagar&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        backgroundColor: '#333333', 
                        color: '#ffffff', 
                      }}
                    >
                      <TableCell component="th" scope="row" sx={{ color: '#ffffff' }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="right" sx={{ color: '#ffffff' }}>{row.loanAmount}</TableCell>
                      <TableCell align="right" sx={{ color: '#ffffff' }}>{row.interestRate}</TableCell>
                      <TableCell align="right" sx={{ color: '#ffffff' }}>{row.years}</TableCell>
                      <TableCell align="right" sx={{ color: '#ffffff' }}>{row.monthlyPayment}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
};

export default SimulationResponse;