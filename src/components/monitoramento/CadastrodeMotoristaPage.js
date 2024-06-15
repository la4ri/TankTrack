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
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedMotorista, setSelectedMotorista] = useState(null);

    useEffect(() => {
        fetchMotoristas();
    }, []);

    const fetchMotoristas = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/motoristas')
            .then(response => setMotoristas(response.data))
            .catch(error => console.error('Erro ao buscar motoristas:', error));
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        axios.get(`https://node-deploy-api-d20r.onrender.com/motoristas/${search}`)
            .then(response => setMotoristas(response.data))
            .catch(error => console.error('Erro ao buscar motorista:', error));
    };

    const handleExportCSV = () => {
        const csv = Papa.unparse(motoristas);
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
                    {/* <input
                        type="text"
                        placeholder="Buscar por nome"
                        value={search}
                        onChange={handleSearchChange}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                handleSearch();
                                ev.preventDefault();
                            }
                        }}
                        className="filter-input"
                    /> */}
                </div>
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>ID Motorista</th>
                                <th>Nome Completo</th>
                                <th>CNH</th>
                                <th>Validade CNH</th>
                                <th>Status de Saúde</th>
                                <th>Editar/Deletar Motorista</th>
                            </tr>
                        </thead>
                        <tbody>
                            {motoristas.map((motorista) => (
                                <tr key={motorista.id_motorista}>
                                    <td>{motorista.id_motorista}</td>
                                    <td>{motorista.nome_motorista}</td>
                                    <td>{motorista.cnh_motorista}</td>
                                    <td>{new Date(motorista.validade_cnh).toLocaleDateString()}</td>
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
                            ))}
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
