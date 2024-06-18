import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/menu.css';
import '../../style/container.css';

const AlertasdeConducaoPage = () => {
    const [viagens, setViagens] = useState([]);
    const [viagensOriginais, setViagensOriginais] = useState([]);
    const [motoristas, setMotoristas] = useState([]);
    const [alertasConducao, setAlertasConducao] = useState([]);
    const [filtroDataSaida, setFiltroDataSaida] = useState('');
    const [filtroDataChegada, setFiltroDataChegada] = useState('');

    useEffect(() => {
        fetchViagens();
        fetchMotoristas();
        fetchAlertasConducao();
    }, []);

    const fetchViagens = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/viagens')
            .then(response => {
                setViagens(response.data);
                setViagensOriginais(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar viagens!", error);
            });
    };

    const fetchMotoristas = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/motoristas')
            .then(response => {
                setMotoristas(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar motoristas!", error);
            });
    };

    const fetchAlertasConducao = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/alertas-conducao')
            .then(response => {
                setAlertasConducao(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar alertas de condução!", error);
            });
    };

    const getMotoristaInfo = (id_motorista) => {
        const motorista = motoristas.find(motorista => motorista.id_motorista === id_motorista);
        return motorista ? motorista.nome_completo : 'Desconhecido';
    };

    const getAlertaConducaoInfo = (id_motorista) => {
        const alerta = alertasConducao.find(alerta => alerta.id_motorista === id_motorista);
        return alerta ? alerta : { tipo_alerta_conducao: 'Desconhecido', descricao_alerta_conducao: 'Desconhecido', data_alerta_conducao: 'Desconhecido' };
    };

    const handleFiltrar = () => {
        let viagensFiltradas = [...viagensOriginais];

        if (filtroDataSaida) {
            viagensFiltradas = viagensFiltradas.filter(viagem => {
                const dataSaida = formatDate(viagem.data_prevista_1);
                return dataSaida === filtroDataSaida;
            });
        }

        if (filtroDataChegada) {
            viagensFiltradas = viagensFiltradas.filter(viagem => {
                const dataChegada = formatDate(viagem.data_prevista_2);
                return dataChegada === filtroDataChegada;
            });
        }

        setViagens(viagensFiltradas);
    };

    const handleLimparFiltros = () => {
        setFiltroDataSaida('');
        setFiltroDataChegada('');
        setViagens(viagensOriginais);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="main">
            <div className="main-content">
                <h1>Alertas de Condução</h1>
                <div className="filters">
                    <div className="filter-group">
                        <label>Filtrar por Data Saída Origem:</label>
                        <input
                            type="date"
                            value={filtroDataSaida}
                            onChange={(e) => setFiltroDataSaida(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <label>Filtrar por Previsão Chegada:</label>
                        <input
                            type="date"
                            value={filtroDataChegada}
                            onChange={(e) => setFiltroDataChegada(e.target.value)}
                        />
                    </div>
                </div>
                <div className='container-filter-buttons'>
                    <button className="filter-button" onClick={handleFiltrar}>
                        Filtrar
                    </button>
                    <button className="clear-button" onClick={handleLimparFiltros}>
                        Limpar Filtros
                    </button>
                </div>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Id Motorista</th>
                                <th>Nome Completo</th>
                                <th>Tipo Alerta Condução</th>
                                <th>Descrição Alerta Condução</th>
                                <th>Data Alerta Condução</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viagens.length > 0 ? (viagens.map((viagem) => {
                                const alertaConducao = getAlertaConducaoInfo(viagem.id_motorista);
                                return (
                                    <tr key={viagem.id_viagem}>
                                        <td>{viagem.id_motorista}</td>
                                        <td>{getMotoristaInfo(viagem.id_motorista)}</td>
                                        <td>{alertaConducao.tipo_alerta_conducao}</td>
                                        <td>{alertaConducao.descricao_alerta_conducao}</td>
                                        <td>{new Date(alertaConducao.data_alerta_conducao).toLocaleDateString()}</td>
                                    </tr>
                                );
                            })
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center' }}>Não há viagens para mostrar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AlertasdeConducaoPage;

