import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/menu.css';
import '../../style/container.css';

const FrotaemOperacaoPage = () => {
    const [rotas, setRotas] = useState([]);
    const [rotasOriginais, setRotasOriginais] = useState([]);
    const [filtroDataSaida, setFiltroDataSaida] = useState('');
    const [filtroDataChegada, setFiltroDataChegada] = useState('');

    useEffect(() => {
        fetchRotas();
    }, []);

    const fetchRotas = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/rotas')
            .then(response => {
                setRotas(response.data);
                setRotasOriginais(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the routes!", error);
            });
    };

    const handleFiltrar = () => {
        let rotasFiltradas = [...rotasOriginais];

        if (filtroDataSaida) {
            rotasFiltradas = rotasFiltradas.filter(rota => {
                const dataSaida = formatDate(rota.data_partida_rota);
                return dataSaida === filtroDataSaida;
            });
        }

        if (filtroDataChegada) {
            rotasFiltradas = rotasFiltradas.filter(rota => {
                const dataChegada = formatDate(rota.data_chegada_rota);
                return dataChegada === filtroDataChegada;
            });
        }

        setRotas(rotasFiltradas);
    };

    const handleLimparFiltros = () => {
        setFiltroDataSaida('');
        setFiltroDataChegada('');
        setRotas(rotasOriginais);
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
                <h1>Frota em Operação</h1>
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
                                <th>Id Veículo</th>
                                <th>Destino</th>
                                <th>Data Prevista</th>
                                <th>Data Partida</th>
                                <th>Data Prevista</th>
                                <th>Data Chegada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rotas.length > 0 ? (
                                rotas.map((rota) => (
                                    <tr key={rota.id_rota}>
                                        <td>{rota.id_veiculo}</td>
                                        <td>{rota.destino_rota}</td>
                                        <td>{rota.data_prevista ? new Date(rota.data_prevista).toLocaleDateString() : 'N/A'}</td>
                                        <td>{new Date(rota.data_partida_rota).toLocaleDateString()}</td>
                                        <td>{rota.data_prevista ? new Date(rota.data_prevista).toLocaleDateString() : 'N/A'}</td>
                                        <td>{new Date(rota.data_chegada_rota).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>Não há rotas para mostrar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FrotaemOperacaoPage;
