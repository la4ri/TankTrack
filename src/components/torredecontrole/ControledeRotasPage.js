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

const ControledeRotasPage = () => {
    const [controleRotas, setControleRotas] = useState([]);
    const [motoristas, setMotoristas] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [filteredRotas, setFilteredRotas] = useState([]);
    const [search, setSearch] = useState({
        id_viagem: '',
        id_motorista: '',
        id_veiculo: '',
        nome_motorista: '',
        placa_veiculo: ''
    });
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedRota, setSelectedRota] = useState(null);

    useEffect(() => {
        fetchControleRotas();
        fetchMotoristas();
        fetchVeiculos();
    }, []);

    const fetchControleRotas = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/controle-rotas')
            .then(response => {
                setControleRotas(response.data);
                setFilteredRotas(response.data);
            })
            .catch(error => console.error('Erro ao buscar controle de rotas:', error));
    };

    const fetchMotoristas = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/motoristas')
            .then(response => setMotoristas(response.data))
            .catch(error => console.error('Erro ao buscar motoristas:', error));
    };

    const fetchVeiculos = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/veiculos')
            .then(response => setVeiculos(response.data))
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
        let filtered = controleRotas;

        if (search.id_viagem) {
            filtered = filtered.filter(rota => rota.id_viagem.toString().includes(search.id_viagem));
        }
        if (search.id_motorista) {
            filtered = filtered.filter(rota => rota.id_motorista.toString().includes(search.id_motorista));
        }
        if (search.id_veiculo) {
            filtered = filtered.filter(rota => rota.id_veiculo.toString().includes(search.id_veiculo));
        }
        if (search.nome_motorista) {
            filtered = filtered.filter(rota => getNomeCompletoMotorista(rota.id_motorista).toLowerCase().includes(search.nome_motorista.toLowerCase()));
        }
        if (search.placa_veiculo) {
            filtered = filtered.filter(rota => getPlacaVeiculo(rota.id_veiculo).toLowerCase().includes(search.placa_veiculo.toLowerCase()));
        }

        setFilteredRotas(filtered);
    }, [search, controleRotas]);

    const handleExportCSV = () => {
        const csv = Papa.unparse(filteredRotas);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'controle_rotas.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpen = (rota = null) => {
        setIsEditing(!!rota);
        setSelectedRota(rota);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedRota(null);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Você tem certeza que quer excluir esta rota?');
        if (confirmDelete) {
            axios.delete(`https://node-deploy-api-d20r.onrender.com/controle-rotas/${id}`)
                .then(() => fetchControleRotas())
                .catch(error => console.error('Erro ao deletar rota:', error));
        }
    };

    const handleClearFilters = () => {
        setSearch({
            id_viagem: '',
            id_motorista: '',
            id_veiculo: '',
            nome_motorista: '',
            placa_veiculo: ''
        });
    };

    const getNomeCompletoMotorista = (id_motorista) => {
        const motorista = motoristas.find(motorista => motorista.id_motorista === id_motorista);
        return motorista ? motorista.nome_completo : 'N/A';
    };

    const getPlacaVeiculo = (id_veiculo) => {
        const veiculo = veiculos.find(veiculo => veiculo.id_veiculo === id_veiculo);
        return veiculo ? veiculo.placa : 'N/A';
    };

    return (
        <div>
            <div className="main-content">
                <h1>Controle de Rotas</h1>
                <div className="containerButtons">
                    <div className="action-buttons">
                        <button className="export-button" onClick={handleExportCSV}>
                            <img src={exportIcon} alt="Exportar" />
                            Exportar tabela
                        </button>
                        <button className="add-button" onClick={() => handleOpen()}>
                            <img src={addIcon} alt="Adicionar" />
                            Adicionar nova Rota
                        </button>
                    </div>
                    <div className='container-clear'>
                        <button className="clear-button" onClick={handleClearFilters}>
                            Limpar Filtros
                        </button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr className='title-table'>
                                <th>ID Viagem
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='id_viagem'
                                            value={search.id_viagem}
                                            onChange={handleSearch}
                                            placeholder="Buscar por ID Viagem"
                                        />
                                    </div>
                                </th>
                                <th>ID Motorista
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='id_motorista'
                                            value={search.id_motorista}
                                            onChange={handleSearch}
                                            placeholder="Buscar por ID Motorista"
                                        />
                                    </div>
                                </th>
                                <th>Nome Motorista
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='nome_motorista'
                                            value={search.nome_motorista}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Nome Motorista"
                                        />
                                    </div>
                                </th>
                                <th>ID Veículo
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='id_veiculo'
                                            value={search.id_veiculo}
                                            onChange={handleSearch}
                                            placeholder="Buscar por ID Veículo"
                                        />
                                    </div>
                                </th>
                                <th>Placa Veículo
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='placa_veiculo'
                                            value={search.placa_veiculo}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Placa"
                                        />
                                    </div>
                                </th>
                                <th>Quantidade de Combustível</th>
                                <th>Primeira Parada</th>
                                <th>Data Prevista Primeira Parada</th>
                                <th>Data Real Primeira Parada</th>
                                <th>Volume Primeira Parada (m³)</th>
                                <th>Segunda Parada</th>
                                <th>Data Prevista Segunda Parada</th>
                                <th>Data Real Segunda Parada</th>
                                <th>Volume Segunda Parada (m³)</th>
                                <th>Terceira Parada</th>
                                <th>Data Prevista Terceira Parada</th>
                                <th>Data Real Terceira Parada</th>
                                <th>Volume Terceira Parada (m³)</th>
                                <th>Parada Final</th>
                                <th>Data Prevista Parada Final</th>
                                <th>Data Real Parada Final</th>
                                <th>Volume Parada Final (m³)</th>
                                <th>Histórico de Alterações</th>
                                <th>Editar/Deletar Rota</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRotas.length > 0 ? (
                                filteredRotas.map((rota) => (
                                    <tr key={rota.id_viagem}>
                                        <td>{rota.id_viagem}</td>
                                        <td>{rota.id_motorista}</td>
                                        <td>{rota ? getNomeCompletoMotorista(rota.nome_motorista) : 'N/A'}</td>
                                        <td>{rota.id_veiculo}</td>
                                        <td>{getPlacaVeiculo(rota.id_veiculo)}</td>
                                        <td>{rota.quantidade_combustivel}</td>
                                        <td>{rota.primeira_parada}</td>
                                        <td>{rota.data_prevista_primeira_parada}</td>
                                        <td>{rota.data_real_primeira_parada}</td>
                                        <td>{rota.volume_primeira_parada_m3}</td>
                                        <td>{rota.segunda_parada}</td>
                                        <td>{rota.data_prevista_segunda_parada}</td>
                                        <td>{rota.data_real_segunda_parada}</td>
                                        <td>{rota.volume_segunda_parada_m3}</td>
                                        <td>{rota.terceira_parada}</td>
                                        <td>{rota.data_prevista_terceira_parada}</td>
                                        <td>{rota.data_real_terceira_parada}</td>
                                        <td>{rota.volume_terceira_parada_m3}</td>
                                        <td>{rota.parada_final}</td>
                                        <td>{rota.data_prevista_parada_final}</td>
                                        <td>{rota.data_real_parada_final}</td>
                                        <td>{rota.volume_parada_final_m3}</td>
                                        <td>{rota.historico_alteracoes}</td>
                                        <td>
                                            <button className="edit-button" onClick={() => handleOpen(rota)}>
                                                <img src={editIcon} alt="Editar" />
                                            </button>
                                            <button className="delete-button" onClick={() => handleDelete(rota.id_viagem)}>
                                                <img src={deleteIcon} alt="Deletar" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="22" style={{ textAlign: 'center' }}>Não há dados para mostrar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <UsuarioModal
                    open={open}
                    handleClose={handleClose}
                    rota={selectedRota}
                    isEditing={isEditing}
                    fetchControleRotas={fetchControleRotas}
                />
            </div>
        </div>
    );
};

export default ControledeRotasPage;
