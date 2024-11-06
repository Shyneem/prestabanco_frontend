import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import simulationService from "../services/hlsimulation.service";
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import SimulationResponse from './SimulationResponse';

const Simulation = () =>{
    const [rut, setRut] = useState("");
    const [name, setName] = useState("");
    const [loanAmount, setLoanAmount] = useState(10000000);
    const [interestRate, setInterestRate] = useState(4.5);
    const [years, setYears] = useState(20);
    const { id } = useParams();
    const { monthlyPayment } = useParams();
    
    const navigate = useNavigate();


    const [hasError, setHasError] = useState(false);
    

    const handleSubmit = (e)=> {
        e.preventDefault();

        const hlSimulation = {
            rut,
            name,
            loanAmount: parseInt(loanAmount, 10), 
            interestRate: parseFloat(interestRate), 
            years: parseInt(years, 10),
            id,
            monthlyPayment
        };

        console.log(hlSimulation);
        simulationService
            .calculatePayment(hlSimulation)
            .then((response) =>{
                console.log("Simulacion creada",response.data);
                navigate("/simulationResponse", { state: { simulationData: response.data } });
            })
            .catch((error) => {
                console.log("Ha ocurrido un erorr",error);
            });
            
    };

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


                <FormControl fullWidth variant="outlined" >
                    <TextField
                        label="Nombre"
                        id="name"
                        value={name}
                        helperText="Ej. Mi primera casa"
                        sx={{ m: 1, width: '25ch' }}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        label="Amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                    />
                </FormControl>
                </div>
                <FormControl>
                <Divider/>
                    <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    
                >
                    Calcular pago mensual
                    </Button>
                </FormControl>
            
            </Box>
        </form>
      );
    
};

export default Simulation;