import React from 'react';
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
import loanRequestService from "../services/loanRequest.service"
import fileUploadService from '../services/fileUpload.service';




const PrimeraVivienda = () => {


  const [hasError, setHasError] = useState(false);
  const [rut, setRut] = useState("");
  const [loanAmount, setLoanAmount] = useState(10000000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [years, setYears] = useState(20);
  const {id} = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);


  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files); 
};



  const handleSubmit = (e) =>{
    e.preventDefault();
    

    if(selectedFiles.length !== 3){
      alert("Ingrese los 3 documentos pedidos");
      return; 
    }

    const loanRequest = {
      rut,
      loanAmount: parseInt(loanAmount, 10), 
      interestRate: parseFloat(interestRate), 
      years: parseInt(years, 10),
      id
  };

  try{
  
    //Se envia primeramente la solicitud para obtener el id
  loanRequestService
    .create(loanRequest)
    .then((response) =>{
      console.log("Solicitud enviada",response.data)
      const loanRequestId = response.data.id;
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append("files", file);
      }
      formData.append("loanRequestId", loanRequestId);

      console.log(formData)
      fileUploadService
        .create(formData)
        .then((response) =>{
          console.log("Archivos enviados",response.data)
        });
        })
        .catch((error)=>{
          console.log("Ha ocurrido un error",error)
        })


    }catch(error){
      console.log("Ha ocurrido un error",error)
    }
    

  }


  return (
        <form onSubmit={handleSubmit}>
            <Box
            sx={{ display: 'flex', flexWrap: 'wrap' }}
            >
                <div>
                <FormControl fullWidth variant="outlined" error={hasError} required>
                    <TextField
                        label="Rut"
                        id="rut"
                        value={rut}
                        helperText="Ej. 12345678-9"
                        sx={{ m: 1, width: '25ch' }}
                        onChange={(e) => setRut(e.target.value)}
                    />
                    {hasError && <FormHelperText>Este campo es obligatorio.</FormHelperText>}
                </FormControl>

                
                <FormControl fullWidth variant="outlined" error={hasError} required>
                    <TextField
                        label="Tasa de interés"
                        id="interestRate"
                        value={interestRate}
                        sx={{ m: 1, width: '25ch' }}
                        onChange={(e) => setInterestRate(e.target.value)}
                        slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">%</InputAdornment>,
                            },
                          }}
                    />
                    {hasError && <FormHelperText>Este campo es obligatorio.</FormHelperText>}
                </FormControl>

                <FormControl fullWidth variant="outlined" error={hasError} required>
                    <TextField
                        label="Cantidad de años a pagar"
                        id="years"
                        value={years}
                        sx={{ m: 1, width: '25ch' }}
                        onChange={(e) => setYears(e.target.value)}
                    />
                    {hasError && <FormHelperText>Este campo es obligatorio.</FormHelperText>}
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant="outlined" error={hasError} required>
                    <InputLabel htmlFor="outlined-adornment-amount">Total crédito</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                    />
                </FormControl>

                <TextField
                  type="file"
                  variant="filled"
                  onChange={handleFileChange}
                  disabled={false}
                  inputProps={{ multiple: true }} // Permite seleccionar múltiples archivos
                  sx={{ mt: 2 }}
                  />
                </div>
                <FormControl>
                <Divider/>
                    <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    
                >
                    Enviar Solicitud
                    </Button>
                </FormControl>
            
            </Box>
        </form>
      );
};

export default PrimeraVivienda;

