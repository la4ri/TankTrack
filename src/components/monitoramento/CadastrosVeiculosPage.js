import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, TextField } from '@mui/material';
import { Edit as EditIcon, History as HistoryIcon } from '@mui/icons-material';
import axios from 'axios';
import VehicleModal from './VehicleModal';
import TopBar from '../TopBar.js';
import SideBar from '../SideBar.js';
import Header from '../Header.js';
import LateralMenuMonitoramento from '../LateralMenuMonitoramento.js';

const CadastrosVeiculosPage = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/veiculos')
            .then(response => setVeiculos(response.data))
            .catch(error => console.error('Erro ao buscar veículos:', error));
    };

    const handleAddVehicle = () => {
        setCurrentVehicle(null);
        setIsEditing(false);
        setOpenModal(true);
    };

    const handleEditVehicle = (vehicle) => {
        setCurrentVehicle(vehicle);
        setIsEditing(true);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + veiculos.map(v => `${v.id_veiculo},${v.modelo_veiculo},${v.placa_veiculo},${v.status_veiculo}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "veiculos.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset the error message

        if (searchQuery.trim() !== '') {
            axios.get(`https://node-deploy-api-d20r.onrender.com/veiculos/placa/${searchQuery.trim()}`)
                .then(response => {
                    if (response.data) {
                        setVeiculos([response.data]);
                    } else {
                        setErrorMessage('Veículo não encontrado');
                        setVeiculos([]);
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar veículo:', error);
                    setErrorMessage('Veículo não encontrado');
                    setVeiculos([]);
                });
        } else {
            fetchVehicles();
        }
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
                                Cadastro de Veículos
                            </Typography>
                            <Button variant="contained" color="primary" onClick={handleAddVehicle}>
                                Adicionar novo veículo
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleExport} style={{ marginLeft: '10px' }}>
                                Exportar tabela
                            </Button>
                            <form onSubmit={handleSearchSubmit} style={{ marginTop: '20px' }}>
                                <TextField
                                    label="Buscar por Placa"
                                    variant="outlined"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </form>
                            {errorMessage && (
                                <Typography variant="h6" color="error" style={{ marginTop: '20px' }}>
                                    {errorMessage}
                                </Typography>
                            )}
                            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID Veículo</TableCell>
                                            <TableCell>Marca Veículo</TableCell>
                                            <TableCell>Placa</TableCell>
                                            <TableCell>Filial</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Editar/Atualizar</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {veiculos.map((veiculo) => (
                                            <TableRow key={veiculo.id_veiculo}>
                                                <TableCell>{veiculo.id_veiculo}</TableCell>
                                                <TableCell>{veiculo.modelo_veiculo}</TableCell>
                                                <TableCell>{veiculo.placa_veiculo}</TableCell>
                                                <TableCell>FILIAL - GOIÂNIA</TableCell> {/* Ajustar conforme necessário */}
                                                <TableCell>{veiculo.status_veiculo}</TableCell>
                                                <TableCell>
                                                    <IconButton color="primary" onClick={() => handleEditVehicle(veiculo)}><EditIcon /></IconButton>
                                                    <IconButton color="secondary"><HistoryIcon /></IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <VehicleModal 
                                open={openModal} 
                                handleClose={handleCloseModal} 
                                vehicle={currentVehicle} 
                                isEditing={isEditing} 
                                fetchVehicles={fetchVehicles} 
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CadastrosVeiculosPage;
