import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import TopBar from '../TopBar.js';
import SideBar from '../SideBar.js';
import Header from '../Header.js';
import LateralMenuMonitoramento from '../LateralMenuMonitoramento.js';

const DispVeiculosPage = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [disponibilidade, setDisponibilidade] = useState({});

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/veiculos')
            .then(response => setVeiculos(response.data))
            .catch(error => console.error('Erro ao buscar veículos:', error));
    };

    const handleDisponibilidadeChange = (id, value) => {
        setDisponibilidade(prev => ({
            ...prev,
            [id]: value
        }));
    };

    return (
        <div>
            <div className="containerMonitoramento">
                <TopBar />
                <SideBar />
                <Header />
                <div className="content">
                    <LateralMenuMonitoramento />
                    <div className="main-section">
                        <Container>
                            <Typography variant="h4" gutterBottom>
                                Disponibilidade de Veículos
                            </Typography>
                            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID Veículo</TableCell>
                                            <TableCell>Placa</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Apto para Viagem</TableCell>
                                            <TableCell>Disponível para Viagem</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {veiculos.map((veiculo) => (
                                            <TableRow key={veiculo.id_veiculo}>
                                                <TableCell>{veiculo.id_veiculo}</TableCell>
                                                <TableCell>{veiculo.placa_veiculo}</TableCell>
                                                <TableCell>{veiculo.status_veiculo}</TableCell>
                                                <TableCell>{veiculo.status_veiculo === 'Disponível' ? 'Sim' : 'Não'}</TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={disponibilidade[veiculo.id_veiculo] || 'Sim'}
                                                        onChange={(e) => handleDisponibilidadeChange(veiculo.id_veiculo, e.target.value)}
                                                    >
                                                        <MenuItem value="Sim">Sim</MenuItem>
                                                        <MenuItem value="Não">Não</MenuItem>
                                                    </Select>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DispVeiculosPage;
