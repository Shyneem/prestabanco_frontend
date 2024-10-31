import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import PrimeraVivienda from './PrimeraVivienda';
import SegundaVivienda from './SegundaVivienda';
import ComercialRealState from './ComercialRealState';
import Remodeling from './Remodeling';

const LoanRequest = () => {
  const [view, setView] = useState('vista1');

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        gap={2}
        mt={-25}
      >
        <Button variant="contained" color="primary" onClick={() => setView('primeraVivienda')}>
          Primera Vivienda
        </Button>
        <Button variant="contained" color="primary" onClick={() => setView('segundaVivienda')}>
          Segunda Vivienda
        </Button>
        <Button variant="contained" color="primary" onClick={()=> setView('comercialRealState')}>
          Propiedad Comercial
        </Button>
        <Button variant="contained" color="primary" onClick={()=> setView('remodeling')}>
          Remodelación
        </Button>
      </Box>
      
      <Box mt={2}>
        {view === 'primeraVivienda' && <PrimeraVivienda />}
        {view === 'segundaVivienda' && <SegundaVivienda />}
        {view === 'comercialRealState' && <ComercialRealState/>}
        {view === 'remodeling' && <Remodeling/>}
      </Box>
    </Box>
  );
};

export default LoanRequest;
