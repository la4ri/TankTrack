import React, { useState, useEffect } from 'react';
import axios from 'axios';
import editIcon from '../../img/edit.svg';
import saveIcon from '../../img/save.svg';
import '../../style/menu.css';
import '../../style/container.css';

const FrotaemOperacaoPage = () => {
    const [viagens, setViagens] = useState([]);
    const [filtro, setFiltro] = useState({
        origem: '',
        chegada: ''
    });
    const [editingVolumeId, setEditingVolumeId] = useState(null);
    const [volume, setVolume] = useState('');

    useEffect(() => {
        fetchViagens();
    }, []);

    const fetchViagens = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/viagens')
            .then(response => {
                setViagens(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar viagens!", error);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFiltro({ ...filtro, [name]: value });
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
    };

    const handleEditVolume = (id_viagem) => {
        setEditingVolumeId(id_viagem);
    };

    const handleSaveVolume = (id_viagem) => {
        const viagem = viagens.find(v => v.id_viagem === id_viagem);
        viagem.quantidade_volume = volume;
        axios.put(`https://node-deploy-api-d20r.onrender.com/viagens/${id_viagem}`, { quantidade_volume: volume })
            .then(() => {
                setViagens(viagens.map(v => v.id_viagem === id_viagem ? viagem : v));
                setEditingVolumeId(null);
                setVolume('');
            })
            .catch(error => {
                console.error("Erro ao salvar volume!", error);
            });
    };

    const filteredViagens = viagens.filter(viagem => {
        const origemMes = new Date(filtro.origem).getMonth();
        const chegadaMes = new Date(filtro.chegada).getMonth();
        const dataPartidaMes = new Date(viagem.data_prevista_1).getMonth();
        const dataChegadaMes = new Date(viagem.data_prevista_2).getMonth();

        return (
            (!filtro.origem || origemMes === dataPartidaMes) &&
            (!filtro.chegada || chegadaMes === dataChegadaMes)
        );
    });

    return (
        <div className="containerTransportadora">
            <div className="content">
                <h1>Gestão de Frota</h1>
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
                                <th>Id Viagem</th>
                                <th>Primeira Parada</th>
                                <th>Data Prevista</th>
                                <th>Volume m<sup>3</sup></th>
                                <th>Data Real</th>
                                <th>Segunda Parada</th>
                                <th>Data Prevista</th>
                                <th>Data Real</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredViagens.map((viagem) => (
                                <tr key={viagem.id_viagem}>
                                    <td>{viagem.id_viagem}</td>
                                    <td>{viagem.primeira_parada}</td>
                                    <td>{new Date(viagem.data_prevista_1).toLocaleDateString()}</td>
                                    <td>
                                        {editingVolumeId === viagem.id_viagem ? (
                                            <div>
                                                <input
                                                    type="number"
                                                    value={volume}
                                                    onChange={handleVolumeChange}
                                                />
                                                <button
                                                    className="save-button"
                                                    onClick={() => handleSaveVolume(viagem.id_viagem)}
                                                >
                                                    <img src={saveIcon} alt="Salvar" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                {viagem.quantidade_volume}
                                                <button
                                                    className="edit-button"
                                                    onClick={() => handleEditVolume(viagem.id_viagem)}
                                                >
                                                    <img src={editIcon} alt="Editar" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td>{new Date(viagem.data_real_1).toLocaleDateString()}</td>
                                    <td>{viagem.segunda_parada}</td>
                                    <td>{new Date(viagem.data_prevista_2).toLocaleDateString()}</td>
                                    <td>{new Date(viagem.data_real_2).toLocaleDateString()}</td>
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
