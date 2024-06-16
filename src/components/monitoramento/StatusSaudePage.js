import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/container.css';
import '../../style/menu.css';

const StatusSaudePage = () => {
    const [motoristas, setMotoristas] = useState([]);
    const [filteredMotoristas, setFilteredMotoristas] = useState([]);
    const [statusSaude, setStatusSaude] = useState({});
    const [disponibilidade, setDisponibilidade] = useState({});
    const [search, setSearch] = useState({
        id: '',
        nome: '',
        status: ''
    });

    useEffect(() => {
        fetchMotoristas();
        fetchStatusSaude();
    }, []);

    const fetchMotoristas = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/motoristas')
            .then(response => {
                setMotoristas(response.data);
                setFilteredMotoristas(response.data); // Initialize filteredMotoristas
            })
            .catch(error => console.error('Erro ao buscar Motoristas:', error));
    };

    const fetchStatusSaude = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/saude')
            .then(response => {
                const statusSaudeMap = response.data.reduce((acc, curr) => {
                    acc[curr.id_motorista] = curr;
                    return acc;
                }, {});
                setStatusSaude(statusSaudeMap);
            })
            .catch(error => console.error('Erro ao buscar status de saúde:', error));
    };

    const handleSearch = (event) => {
        const { name, value } = event.target;
        setSearch(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        let filtered = motoristas;

        if (search.id) {
            filtered = filtered.filter(motorista => motorista.id_motorista.toString().includes(search.id));
        }
        if (search.nome) {
            filtered = filtered.filter(motorista => motorista.nome_motorista.toLowerCase().includes(search.nome.toLowerCase()));
        }
        if (search.status) {
            filtered = filtered.filter(motorista => motorista.status_saude_motorista.toLowerCase().includes(search.status.toLowerCase()));
        }

        setFilteredMotoristas(filtered);
    }, [search, motoristas]);

    const handleDisponibilidadeChange = (id, value) => {
        setDisponibilidade(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleClearFilters = () => {
        setSearch({
            id: '',
            nome: '',
            status: ''
        });
    };

    return (
        <div>
            <div className="main-content">
                <h1>Disponibilidade de Motoristas</h1>
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
                                <th>ID Motorista
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
                                <th>Nome Completo
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name="nome"
                                            value={search.nome}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Nome Completo"
                                        />
                                    </div>
                                </th>
                                <th>Status de Saúde
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
                                <th>Último Exame de Aptidão</th>
                                <th>Próximo Exame de Aptidão</th>
                                <th>Última Alerta de Condução</th>
                                <th>Observação</th>
                                <th>Apto para Viagem</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMotoristas.length > 0 ? (
                                filteredMotoristas.map((motorista) => (
                                    <tr key={motorista.id_motorista}>
                                        <td>{motorista.id_motorista}</td>
                                        <td>{motorista.nome_motorista}</td>
                                        <td>{motorista.status_saude_motorista}</td>
                                        <td>{statusSaude[motorista.id_motorista] ? statusSaude[motorista.id_motorista].data_exame_saude : '-'}</td>
                                        <td>{/* Lógica para próximo exame de aptidão */}</td>
                                        <td>{/* Lógica para última alerta de condução */}</td>
                                        <td>{statusSaude[motorista.id_motorista] ? statusSaude[motorista.id_motorista].observacao_saude : '-'}</td>
                                        <td>{motorista.status_saude_motorista === 'apto' ? 'Sim' : 'Não'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>Não há dados para mostrar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StatusSaudePage;
