import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VehicleModal from './VehicleModal';
import editIcon from '../../img/edit.svg';
import exportIcon from '../../img/export.svg';
import addIcon from '../../img/add.svg';
import '../../style/container.css';
import '../../style/menu.css';

const CadastrosVeiculosPage = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/veiculos')
            .then(response => setVeiculos(response.data))
            .catch(error => console.error('Erro ao buscar veículos:', error));
    };

    const handleAddVehicle = () => {
        setCurrentVehicle(null);
        setIsEditing(false);
        setOpenModal(true);
    };

    const handleEditVehicle = (vehicle) => {
        setCurrentVehicle(vehicle);
        setIsEditing(true);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + veiculos.map(v => `${v.id_veiculo},${v.modelo_veiculo},${v.placa_veiculo},${v.status_veiculo}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "veiculos.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset the error message

        if (searchQuery.trim() !== '') {
            axios.get(`https://node-deploy-api-d20r.onrender.com/veiculos/placa/${searchQuery.trim()}`)
                .then(response => {
                    if (response.data) {
                        setVeiculos([response.data]);
                    } else {
                        setErrorMessage('Veículo não encontrado');
                        setVeiculos([]);
                    }
                })
                .catch(error => {
                    console.error('Erro ao buscar veículo:', error);
                    setErrorMessage('Veículo não encontrado');
                    setVeiculos([]);
                });
        } else {
            fetchVehicles();
        }
    };

    return (
        <div>
            <div className="main-content">
                <h1>Cadastro de Veículos</h1>
                <div className="containerButtons">
                    <div className="action-buttons">
                        <button className="export-button" onClick={handleExport}>
                            <img src={exportIcon} alt="Exportar" />
                            Exportar tabela
                        </button>
                        <button className="add-button" onClick={handleAddVehicle}>
                            <img src={addIcon} alt="Adicionar" />
                            Adicionar novo veículo
                        </button>
                    </div>
                    {/* <form onSubmit={handleSearchSubmit} className="filter-group">
                        <input
                            type="text"
                            placeholder="Buscar por Placa"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="filter-input"
                        />
                        <button type="submit" className="filter-button">Buscar</button>
                    </form> */}
                </div>
                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID Veículo</th>
                            <th>Marca Veículo</th>
                            <th>Placa</th>
                            <th>Filial</th>
                            <th>Status</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {veiculos.map((veiculo) => (
                            <tr key={veiculo.id_veiculo}>
                                <td>{veiculo.id_veiculo}</td>
                                <td>{veiculo.modelo_veiculo}</td>
                                <td>{veiculo.placa_veiculo}</td>
                                <td>FILIAL - GOIÂNIA</td> {/* Ajustar conforme necessário */}
                                <td>{veiculo.status_veiculo}</td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEditVehicle(veiculo)}>
                                        <img src={editIcon} alt="Editar" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <VehicleModal
                    open={openModal}
                    handleClose={handleCloseModal}
                    vehicle={currentVehicle}
                    isEditing={isEditing}
                    fetchVehicles={fetchVehicles}
                />
            </div>
        </div>
    );
};

export default CadastrosVeiculosPage;