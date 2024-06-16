import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MotoristaModal from './MotoristaModal.js';
import editIcon from '../../img/edit.svg';
import deleteIcon from '../../img/delete.svg';
import addIcon from '../../img/add.svg';
import exportIcon from '../../img/export.svg';
import Papa from 'papaparse';
import '../../style/menu.css';
import '../../style/container.css';

const CadastrodeMotoristaPage = () => {
    const [motoristas, setMotoristas] = useState([]);
    const [filteredMotoristas, setFilteredMotoristas] = useState([]);
    const [search, setSearch] = useState({
        id: '',
        nome: '',
        cnh: '',
        validadeCnh: '',
        statusSaude: ''
    });
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedMotorista, setSelectedMotorista] = useState(null);

    useEffect(() => {
        fetchMotoristas();
    }, []);

    const fetchMotoristas = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/motoristas')
            .then(response => {
                setMotoristas(response.data);
                setFilteredMotoristas(response.data); // Initialize filteredMotoristas
            })
            .catch(error => console.error('Erro ao buscar motoristas:', error));
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
        if (search.cnh) {
            filtered = filtered.filter(motorista => motorista.cnh_motorista.toLowerCase().includes(search.cnh.toLowerCase()));
        }
        if (search.validadeCnh) {
            filtered = filtered.filter(motorista => motorista.validade_cnh.includes(search.validadeCnh));
        }
        if (search.statusSaude) {
            filtered = filtered.filter(motorista => motorista.status_saude_motorista.toLowerCase().includes(search.statusSaude.toLowerCase()));
        }

        setFilteredMotoristas(filtered);
    }, [search, motoristas]);

    const handleExportCSV = () => {
        const csv = Papa.unparse(filteredMotoristas);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'motoristas.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpen = (motorista = null) => {
        setIsEditing(!!motorista);
        setSelectedMotorista(motorista);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedMotorista(null);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Você tem certeza que quer excluir este motorista?');
        if (confirmDelete) {
            axios.delete(`https://node-deploy-api-d20r.onrender.com/motoristas/${id}`)
                .then(() => fetchMotoristas())
                .catch(error => console.error('Erro ao deletar motorista:', error));
        }
    };

    const handleClearFilters = () => {
        setSearch({
            id: '',
            nome: '',
            cnh: '',
            validadeCnh: '',
            statusSaude: ''
        });
    };

    return (
        <div>
            <div className="main-content">
                <h1>Cadastro de Motoristas</h1>
                <div className="containerButtons">
                    <div className="action-buttons">
                        <button className="export-button" onClick={handleExportCSV}>
                            <img src={exportIcon} alt="Exportar" />
                            Exportar tabela
                        </button>
                        <button className="add-button" onClick={() => handleOpen()}>
                            <img src={addIcon} alt="Adicionar" />
                            Adicionar novo motorista
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
                                <th>ID Motorista
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='id'
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
                                            name='nome'
                                            value={search.nome}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Nome"
                                        />
                                    </div>
                                </th>
                                <th>CNH
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='cnh'
                                            value={search.cnh}
                                            onChange={handleSearch}
                                            placeholder="Buscar por CNH"
                                        />
                                    </div>
                                </th>
                                <th>Validade CNH
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='validadeCnh'
                                            value={search.validadeCnh}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Validade"
                                        />
                                    </div>
                                </th>
                                <th>Status de Saúde
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='statusSaude'
                                            value={search.statusSaude}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Status"
                                        />
                                    </div>
                                </th>
                                <th>Editar/Deletar Motorista</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMotoristas.length > 0 ? (
                                filteredMotoristas.map((motorista) => (
                                    <tr key={motorista.id_motorista}>
                                        <td>{motorista.id_motorista}</td>
                                        <td>{motorista.nome_motorista}</td>
                                        <td>{motorista.cnh_motorista}</td>
                                        <td>{motorista.validade_cnh ? new Date(motorista.validade_cnh).toLocaleDateString() : 'Data inválida'}</td>
                                        <td>{motorista.status_saude_motorista}</td>
                                        <td>
                                            <button className="edit-button" onClick={() => handleOpen(motorista)}>
                                                <img src={editIcon} alt="Editar" />
                                            </button>
                                            <button className="delete-button" onClick={() => handleDelete(motorista.id_motorista)}>
                                                <img src={deleteIcon} alt="Deletar" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>não há dados para mostrar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <MotoristaModal
                    open={open}
                    handleClose={handleClose}
                    motorista={selectedMotorista}
                    isEditing={isEditing}
                    fetchMotoristas={fetchMotoristas}
                />
            </div>
        </div>
    );
};

export default CadastrodeMotoristaPage;
