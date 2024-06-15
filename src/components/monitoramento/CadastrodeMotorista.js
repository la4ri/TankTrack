import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, History as HistoryIcon } from '@mui/icons-material';
import axios from 'axios';
import MotoristaModal from './MotoristaModal.js';
import Papa from 'papaparse';
import '../../style/menu.css';

const MonitoramentoPage = () => {
    const [motoristas, setMotoristas] = useState([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedMotorista, setSelectedMotorista] = useState(null);

    useEffect(() => {
        fetchMotoristas();
    }, []);

    const fetchMotoristas = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/motoristas')
            .then(response => setMotoristas(response.data))
            .catch(error => console.error('Erro ao buscar motoristas:', error));
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        axios.get(`https://node-deploy-api-d20r.onrender.com/motoristas/${search}`)
            .then(response => setMotoristas(response.data))
            .catch(error => console.error('Erro ao buscar motorista:', error));
    };

    const handleExportCSV = () => {
        const csv = Papa.unparse(motoristas);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'motoristas.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpen = (motorista = null) => {
        setIsEditing(!!motorista);
        setSelectedMotorista(motorista);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedMotorista(null);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Você tem certeza que quer excluir este motorista?');
        if (confirmDelete) {
            axios.delete(`https://node-deploy-api-d20r.onrender.com/motoristas/${id}`)
                .then(() => fetchMotoristas())
                .catch(error => console.error('Erro ao deletar motorista:', error));
        }
    };

    return (
        <div>
            <div className="containerMonitoramento">
                <div className="content">
                    <div className="main-section">
                        <Container>
                            <Typography variant="h4" gutterBottom>
                                Cadastro de Motoristas
                            </Typography>
                            <Button variant="contained" color="primary" onClick={() => handleOpen()} sx={{ marginBottom: 2 }}>
                                + Adicionar novo motorista
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleExportCSV} sx={{ marginBottom: 2, marginLeft: 2 }}>
                                Exportar tabela
                            </Button>
                            <TextField
                                label="Buscar por nome"
                                variant="outlined"
                                fullWidth
                                value={search}
                                onChange={handleSearchChange}
                                onKeyPress={(ev) => {
                                    if (ev.key === 'Enter') {
                                        handleSearch();
                                        ev.preventDefault();
                                    }
                                }}
                                sx={{ marginBottom: 2 }}
                            />
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID Motorista</TableCell>
                                            <TableCell>Nome Completo</TableCell>
                                            <TableCell>CNH</TableCell>
                                            <TableCell>Validade CNH</TableCell>
                                            <TableCell>Status de Saúde</TableCell>
                                            <TableCell>Editar/Histórico</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {motoristas.map((motorista) => (
                                            <TableRow key={motorista.id_motorista}>
                                                <TableCell>{motorista.id_motorista}</TableCell>
                                                <TableCell>{motorista.nome_motorista}</TableCell>
                                                <TableCell>{motorista.cnh_motorista}</TableCell>
                                                <TableCell>{new Date(motorista.validade_cnh).toLocaleDateString()}</TableCell>
                                                <TableCell>{motorista.status_saude_motorista}</TableCell>
                                                <TableCell>
                                                    <IconButton color="primary" onClick={() => handleOpen(motorista)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton color="secondary" onClick={() => handleDelete(motorista.id_motorista)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <IconButton color="default">
                                                        <HistoryIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <MotoristaModal
                                open={open}
                                handleClose={handleClose}
                                motorista={selectedMotorista}
                                isEditing={isEditing}
                                fetchMotoristas={fetchMotoristas}
                            />
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitoramentoPage;
