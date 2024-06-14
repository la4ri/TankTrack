import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import TopBar from '../TopBar.js';
import SideBar from '../SideBar.js';
import Header from '../Header.js';
import LateralMenuMonitoramento from '../LateralMenuMonitoramento.js';
import '../../style/menu.css';

const StatusVeiculoPage = () => {
    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/veiculos')
            .then(response => setVeiculos(response.data))
            .catch(error => console.error('Erro ao buscar veículos:', error));
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
                                Status de Manutenção do Veículo
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Última Revisão</TableCell>
                                            <TableCell>Próxima Revisão</TableCell>
                                            <TableCell>Última Manutenção</TableCell>
                                            <TableCell>Tipo da Manutenção</TableCell>
                                            <TableCell>Apto para Viagem</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {veiculos.map((veiculo, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{veiculo.status_veiculo}</TableCell> {/* Status real do veículo */}
                                                <TableCell>15/01/2023</TableCell> {/* Data fictícia */}
                                                <TableCell>15/06/2023</TableCell> {/* Data fictícia */}
                                                <TableCell>15/02/2023</TableCell> {/* Data fictícia */}
                                                <TableCell>Troca de óleo</TableCell> {/* Tipo fictício */}
                                                <TableCell>{veiculo.status_veiculo === 'Apto' ? 'Sim' : 'Não'}</TableCell>
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

export default StatusVeiculoPage;
