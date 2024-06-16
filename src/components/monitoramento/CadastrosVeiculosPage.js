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
    const [filteredVeiculos, setFilteredVeiculos] = useState([]);
    const [search, setSearch] = useState({
        id: '',
        marca: '',
        placa: '',
        filial: '',
        status: ''
    });
    const [openModal, setOpenModal] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/veiculos')
            .then(response => {
                setVeiculos(response.data);
                setFilteredVeiculos(response.data); // Initialize filteredVeiculos
            })
            .catch(error => console.error('Erro ao buscar veículos:', error));
    };

    const handleSearch = (event) => {
        const { name, value } = event.target;
        setSearch(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        let filtered = veiculos;

        if (search.id) {
            filtered = filtered.filter(veiculo => veiculo.id_veiculo.toString().includes(search.id));
        }
        if (search.marca) {
            filtered = filtered.filter(veiculo => veiculo.modelo_veiculo.toLowerCase().includes(search.marca.toLowerCase()));
        }
        if (search.placa) {
            filtered = filtered.filter(veiculo => veiculo.placa_veiculo.toLowerCase().includes(search.placa.toLowerCase()));
        }
        if (search.filial) {
            filtered = filtered.filter(veiculo => "FILIAL - GOIÂNIA".toLowerCase().includes(search.filial.toLowerCase()));
        }
        if (search.status) {
            filtered = filtered.filter(veiculo => veiculo.status_veiculo.toLowerCase().includes(search.status.toLowerCase()));
        }

        setFilteredVeiculos(filtered);
    }, [search, veiculos]);

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + filteredVeiculos.map(v => `${v.id_veiculo},${v.modelo_veiculo},${v.placa_veiculo},FILIAL - GOIÂNIA,${v.status_veiculo}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "veiculos.csv");
        document.body.appendChild(link); // Required for FF
        link.click();
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

    const handleClearFilters = () => {
        setSearch({
            id: '',
            marca: '',
            placa: '',
            filial: '',
            status: ''
        });
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
                    <div className='container-clear'>
                        <button className="clear-button" onClick={handleClearFilters}>
                            Limpar Filtros
                        </button>
                    </div>
                </div>
                {errorMessage && (
                    <div className="error-message">
                        {errorMessage}
                    </div>
                )}
                <div className="table-container">
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>ID Veículo
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
                                <th>Marca Veículo
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='marca'
                                            value={search.marca}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Marca"
                                        />
                                    </div>
                                </th>
                                <th>Placa
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='placa'
                                            value={search.placa}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Placa"
                                        />
                                    </div>
                                </th>
                                <th>Filial
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='filial'
                                            value={search.filial}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Filial"
                                        />
                                    </div>
                                </th>
                                <th>Status
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='status'
                                            value={search.status}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Status"
                                        />
                                    </div>
                                </th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVeiculos.length > 0 ? (
                                filteredVeiculos.map((veiculo) => (
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
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center' }}>não há dados para mostrar</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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
