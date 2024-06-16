import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';
import '../../style/container.css';
import '../../style/menu.css';

const DispVeiculosPage = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [filteredVeiculos, setFilteredVeiculos] = useState([]);
    const [disponibilidade, setDisponibilidade] = useState({});
    const [search, setSearch] = useState({
        id: '',
        placa: '',
        status: ''
    });

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/veiculos')
            .then(response => {
                setVeiculos(response.data);
                setFilteredVeiculos(response.data); // Initialize filteredVeiculos
            })
            .catch(error => console.error('Erro ao buscar veículos:', error));
    };

    const handleSearch = (event) => {
        const { name, value } = event.target;
        setSearch(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        let filtered = veiculos;

        if (search.id) {
            filtered = filtered.filter(veiculo => veiculo.id_veiculo.toString().includes(search.id));
        }
        if (search.placa) {
            filtered = filtered.filter(veiculo => veiculo.placa_veiculo.toLowerCase().includes(search.placa.toLowerCase()));
        }
        if (search.status) {
            filtered = filtered.filter(veiculo => veiculo.status_veiculo.toLowerCase().includes(search.status.toLowerCase()));
        }

        setFilteredVeiculos(filtered);
    }, [search, veiculos]);

    const handleDisponibilidadeChange = (id, value) => {
        setDisponibilidade(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleClearFilters = () => {
        setSearch({
            id: '',
            placa: '',
            status: ''
        });
    };

    return (
        <div>
            <div className="main-content">
                <h1>Disponibilidade de Veículos</h1>
                <div className="containerButtons">
                    <div className="action-buttons">
                        <button className="clear-button" onClick={handleClearFilters}>
                            Limpar Filtros
                        </button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>ID Veículo
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name="id"
                                            value={search.id}
                                            onChange={handleSearch}
                                            placeholder="Buscar por ID"
                                        />
                                    </div>
                                </th>
                                <th>Placa
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name="placa"
                                            value={search.placa}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Placa"
                                        />
                                    </div>
                                </th>
                                <th>Status
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name="status"
                                            value={search.status}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Status"
                                        />
                                    </div>
                                </th>
                                <th>Apto para Viagem</th>
                                <th>Disponível para Viagem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVeiculos.length > 0 ? (
                                filteredVeiculos.map((veiculo) => (
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>não há dados para mostrar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DispVeiculosPage;
