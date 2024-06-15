import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import TopBar from '../TopBar.js';
import SideBar from '../SideBar.js';
import Header from '../Header.js';
import LateralMenuMonitoramento from '../LateralMenuMonitoramento.js';

const ManutencaoPage = () => {
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
                            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
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
                                        {veiculos.map((veiculo) => (
                                            <TableRow key={veiculo.id_veiculo}>
                                                <TableCell>{veiculo.status_veiculo}</TableCell>
                                                <TableCell>Data Fictícia</TableCell>
                                                <TableCell>Data Fictícia</TableCell>
                                                <TableCell>Data Fictícia</TableCell>
                                                <TableCell>Tipo Fictício</TableCell>
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

export default ManutencaoPage;
