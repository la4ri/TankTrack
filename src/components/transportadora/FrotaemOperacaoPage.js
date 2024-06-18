import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/menu.css';
import '../../style/container.css';

const FrotaemOperacaoPage = () => {
    const [rotas, setRotas] = useState([]);
    const [filtro, setFiltro] = useState({
        origem: '',
        chegada: ''
    });

    useEffect(() => {
        axios.get('https://node-deploy-api-d20r.onrender.com/rotas')
            .then(response => {
                setRotas(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the routes!", error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFiltro({ ...filtro, [name]: value });
    };

    const filteredRotas = rotas.filter(rota => {
        const origemMes = new Date(filtro.origem).getMonth();
        const chegadaMes = new Date(filtro.chegada).getMonth();
        const dataPartidaMes = new Date(rota.data_partida_rota).getMonth();
        const dataChegadaMes = new Date(rota.data_chegada_rota).getMonth();
        
        return (
            (!filtro.origem || origemMes === dataPartidaMes) &&
            (!filtro.chegada || chegadaMes === dataChegadaMes)
        );
    });

    return (
        <div className="containerTransportadora">
            <div className="content">
                <h1>Frota em Operação</h1>
                <div className="filters">
                    <div className="filter-item">
                        <label>Filtrar por Data Saída Origem:</label>
                        <input
                            type="month"
                            name="origem"
                            value={filtro.origem}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="filter-item">
                        <label>Filtrar por Previsão Chegada:</label>
                        <input
                            type="month"
                            name="chegada"
                            value={filtro.chegada}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <button className="filter-button">Filtrar</button>
                <div className="table-container">
                    <table className="rota-table">
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
                            {filteredRotas.map((rota) => (
                                <tr key={rota.id_rota}>
                                    <td>{rota.id_veiculo}</td>
                                    <td>{rota.destino_rota}</td>
                                    <td>{rota.data_prevista ? new Date(rota.data_prevista).toLocaleDateString() : 'N/A'}</td>
                                    <td>{new Date(rota.data_partida_rota).toLocaleDateString()}</td>
                                    <td>{rota.data_prevista ? new Date(rota.data_prevista).toLocaleDateString() : 'N/A'}</td>
                                    <td>{new Date(rota.data_chegada_rota).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FrotaemOperacaoPage;
