import React, { useState, useEffect } from 'react';
import axios from 'axios';
import editIcon from '../../img/edit.svg';
import saveIcon from '../../img/save.svg';
import '../../style/container.css';

const GestaodeFrotaPage = () => {
    const [viagens, setViagens] = useState([]);
    const [viagensOriginais, setViagensOriginais] = useState([]);
    const [filtroDataSaida, setFiltroDataSaida] = useState('');
    const [filtroDataChegada, setFiltroDataChegada] = useState('');
    const [editingVolumeId, setEditingVolumeId] = useState(null);
    const [volume, setVolume] = useState('');

    useEffect(() => {
        fetchViagens();
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
                <h1>Gestão de Frota</h1>
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
                            {viagens.length > 0 ? (
                                viagens.map((viagem) => (
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center' }}>Não há viagens para mostrar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GestaodeFrotaPage;
