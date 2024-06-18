import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsuarioModal from './UsuarioModal.js';
import editIcon from '../../img/edit.svg';
import deleteIcon from '../../img/delete.svg';
import addIcon from '../../img/add.svg';
import exportIcon from '../../img/export.svg';
import Papa from 'papaparse';
import '../../style/menu.css';
import '../../style/container.css';

const HistoricodeConducaoPage = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [filteredVeiculos, setFilteredVeiculos] = useState([]);
    const [motoristas, setMotoristas] = useState([]);
    const [historicoConducao, setHistoricoConducao] = useState([]);
    const [disponibilidade, setDisponibilidade] = useState({});
    const [search, setSearch] = useState({
        id: '',
        placa: '',
        status: ''
    });

    useEffect(() => {
        fetchVehicles();
        fetchMotoristas();
        fetchHistoricoConducao();
    }, []);

    const fetchVehicles = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/veiculos')
            .then(response => setVeiculos(response.data))
            .catch(error => console.error('Erro ao buscar veículos:', error));
    };

    const fetchMotoristas = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/motoristas')
            .then(response => setMotoristas(response.data))
            .catch(error => console.error('Erro ao buscar motoristas:', error));
    };

    const fetchHistoricoConducao = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/historico-conducao')
            .then(response => setHistoricoConducao(response.data))
            .catch(error => console.error('Erro ao buscar histórico de condução:', error));
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

    const getNomeCompletoMotorista = (id_motorista) => {
        const motorista = motoristas.find(motorista => motorista.id_motorista === id_motorista);
        return motorista ? motorista.nome_completo : 'N/A';
    };

    return (
        <div>
            <div className="main-content">
                <h1>Histórico de Condução</h1>
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
                                <th>ID Motorista</th>
                                <th>Nome Completo</th>
                                <th>Data do Histórico de Condução</th>
                                <th>Disponibilidade</th>
                                <th>Status de Saúde</th>
                                <th>Pronto para Viagem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVeiculos.length > 0 ? (
                                filteredVeiculos.map((veiculo) => {
                                    const historico = historicoConducao.find(h => h.id_veiculo === veiculo.id_veiculo);
                                    return (
                                        <tr key={veiculo.id_veiculo}>
                                            <td>{veiculo.id_veiculo}</td>
                                            <td>{veiculo.placa_veiculo}</td>
                                            <td>{veiculo.status_veiculo}</td>
                                            <td>{historico ? historico.id_motorista : 'N/A'}</td>
                                            <td>{historico ? getNomeCompletoMotorista(historico.id_motorista) : 'N/A'}</td>
                                            <td>{historico ? historico.data_historico_conducao : 'N/A'}</td>
                                            <td>{historico ? historico.disponibilidade : 'N/A'}</td>
                                            <td>{historico ? historico.status_saude : 'N/A'}</td>
                                            <td>{historico ? historico.pronto_para_viagem : 'N/A'}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="9" style={{ textAlign: 'center' }}>Não há dados para mostrar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HistoricodeConducaoPage;
