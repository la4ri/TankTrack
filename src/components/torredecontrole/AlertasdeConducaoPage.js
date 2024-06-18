import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../../style/menu.css';
import '../../style/container.css';
import '../../style/modal2.css'; // Importação do arquivo CSS do modal

// Configura o react-modal para o elemento raiz do aplicativo
Modal.setAppElement('#root');

const AlertasdeConducaoPage = () => {
    const [viagens, setViagens] = useState([]);
    const [viagensOriginais, setViagensOriginais] = useState([]);
    const [motoristas, setMotoristas] = useState([]);
    const [alertasConducao, setAlertasConducao] = useState([]);
    const [filtroDataSaida, setFiltroDataSaida] = useState('');
    const [filtroDataChegada, setFiltroDataChegada] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [novoAlerta, setNovoAlerta] = useState({
        id_motorista: '',
        id_veiculo: '',
        id_viagem: '',
        tipo_alerta_conducao: '',
        descricao_alerta_conducao: '',
        data_alerta_conducao: '' // Novo campo de data
    });

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
        axios.get('https://node-deploy-api-d20r.onrender.com/alerta-conducao')
            .then(response => {
                setAlertasConducao(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar alertas de condução!", error);
            });
    };

    const getMotoristaInfo = (id_motorista) => {
        const motorista = motoristas.find(motorista => motorista.id_motorista === id_motorista);
        return motorista ? motorista.nome_motorista : 'Desconhecido';
    };

    const getAlertaConducaoInfo = (id_motorista) => {
        const alerta = alertasConducao.find(alerta => alerta.id_motorista === id_motorista);
        return alerta ? alerta : {
            tipo_alerta_conducao: 'Desconhecido',
            descricao_alerta_conducao: 'Desconhecido',
            data_alerta_conducao: 'Desconhecido'
        };
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

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoAlerta({ ...novoAlerta, [name]: value });
    };

    const handleAddAlerta = () => {
        axios.post('https://node-deploy-api-d20r.onrender.com/alerta-conducao', novoAlerta)
            .then(response => {
                setAlertasConducao([...alertasConducao, response.data]);
                closeModal();
            })
            .catch(error => {
                console.error("Erro ao adicionar alerta de condução!", error);
            });
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
                <div className='container-add-button'>
                    <button className="add-button" onClick={openModal}>
                        Adicionar Alerta de Condução
                    </button>
                </div>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Id Motorista</th>
                                <th>Nome Completo</th>
                                <th>Tipo Alerta Condução</th>
                                <th>Descrição Alerta Conducao</th>
                                <th>Data Alerta Conducao</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viagens.length > 0 ? (
                                viagens.map((viagem) => {
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

            {/* Modal para adicionar alerta de condução */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Adicionar Alerta de Condução"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Adicionar Alerta de Condução</h2>
                <form className="modal-form">
                    <div className="form-group">
                        <label>Motorista:</label>
                        <select name="id_motorista" value={novoAlerta.id_motorista} onChange={handleInputChange}>
                            <option value="">Selecione um motorista</option>
                            {motoristas.map(motorista => (
                                <option key={motorista.id_motorista} value={motorista.id_motorista}>
                                    {motorista.nome_motorista}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Veículo:</label>
                        <input type="number" name="id_veiculo" value={novoAlerta.id_veiculo} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Viagem:</label>
                        <input type="number" name="id_viagem" value={novoAlerta.id_viagem} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Tipo de Alerta:</label>
                        <input type="text" name="tipo_alerta_conducao" value={novoAlerta.tipo_alerta_conducao} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Descrição:</label>
                        <textarea name="descricao_alerta_conducao" value={novoAlerta.descricao_alerta_conducao} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Data do Alerta:</label>
                        <input type="date" name="data_alerta_conducao" value={novoAlerta.data_alerta_conducao} onChange={handleInputChange} />
                    </div>
                    <div className="form-buttons">
                        <button type="button" className="modal-button" onClick={handleAddAlerta}>
                            Adicionar
                        </button>
                        <button type="button" className="modal-button cancel" onClick={closeModal}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AlertasdeConducaoPage;
