import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';
import '../../style/container.css';
import '../../style/menu.css';

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
            <div className="main-content">
                <h1>Disponibilidade de Veículos</h1>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>ID Veículo</th>
                                <th>Placa</th>
                                <th>Status</th>
                                <th>Apto para Viagem</th>
                                <th>Disponível para Viagem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {veiculos.map((veiculo) => (
                                <tr key={veiculo.id_veiculo}>
                                    <td>{veiculo.id_veiculo}</td>
                                    <td>{veiculo.placa_veiculo}</td>
                                    <td>{veiculo.status_veiculo}</td>
                                    <td>{veiculo.status_veiculo === 'Disponível' ? 'Sim' : 'Não'}</td>
                                    <td>
                                        <Select
                                            value={disponibilidade[veiculo.id_veiculo] || 'Sim'}
                                            onChange={(e) => handleDisponibilidadeChange(veiculo.id_veiculo, e.target.value)}
                                        >
                                            <MenuItem value="Sim">Sim</MenuItem>
                                            <MenuItem value="Não">Não</MenuItem>
                                        </Select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DispVeiculosPage;
