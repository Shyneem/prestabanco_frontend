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
import simulationService from "../services/hlsimulation.service";
import { useAuth } from "../contexts/auth.context";

const Simulation = () => {
    const [rut, setRut] = useState("");
    const [name, setName] = useState("");
    const [loanAmount, setLoanAmount] = useState(10000000);
    const [interestRate, setInterestRate] = useState(4.5);
    const [years, setYears] = useState(20);
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const { monthlyPayment } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!rut) newErrors.rut = "Este campo es obligatorio.";
        if (!loanAmount) newErrors.loanAmount = "Este campo es obligatorio.";
        if (!interestRate) newErrors.interestRate = "Este campo es obligatorio.";
        if (!years) newErrors.years = "Este campo es obligatorio.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

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
        console.log("Usuario logeado:", user);
        simulationService
            .calculatePayment(user.id, hlSimulation)
            .then((response) => {
                console.log("Simulacion creada", response.data);
                navigate("/simulationResponse", { state: { simulationData: response.data } });
            })
            .catch((error) => {
                console.log("Ha ocurrido un error", error);
            });
    };

    return (
        <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#f7f7f7' }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#000000' }}>
                Simulación de Crédito
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                label="Nombre"
                                id="name"
                                value={name}
                                helperText="Ej. Mi primera casa"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined" error={!!errors.loanAmount} required>
                            <InputLabel htmlFor="outlined-adornment-amount">Total crédito</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                label="Amount"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                            />
                            {errors.loanAmount && <FormHelperText>{errors.loanAmount}</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ mb: 2 }} />
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            fullWidth
                        >
                            Calcular pago mensual
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default Simulation;