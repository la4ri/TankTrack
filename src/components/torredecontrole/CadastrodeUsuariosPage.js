import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsuarioModal from './UsuarioModal.js';
import editIcon from '../../img/edit.svg';
import deleteIcon from '../../img/delete.svg';
import addIcon from '../../img/add.svg';
import exportIcon from '../../img/export.svg';
import Papa from 'papaparse';
import '../../style/menu.css';
import '../../style/container.css';

const CadastrodeUsuariosPage = () => {
    const [usuario, setUsuario] = useState([]);
    const [filteredUsuario, setFilteredUsuario] = useState([]);
    const [search, setSearch] = useState({
        id: '',
        nome: '',
        email: '',
        cpf: '',
        permissao: ''
    });
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

    useEffect(() => {
        fetchUsuario();
    }, []);

    const fetchUsuario = () => {
        axios.get('https://node-deploy-api-d20r.onrender.com/usuarios')
            .then(response => {
                setUsuario(response.data);
                setFilteredUsuario(response.data); // Initialize filteredUsuario
            })
            .catch(error => console.error('Erro ao buscar Usuario:', error));
    };

    const handleSearch = (event) => {
        const { name, value } = event.target;
        setSearch(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        let filtered = usuario;

        if (search.id) {
            filtered = filtered.filter(usuario => usuario.id_usuario.toString().includes(search.id));
        }
        if (search.nome) {
            filtered = filtered.filter(usuario => usuario.nome_usuario.toLowerCase().includes(search.nome.toLowerCase()));
        }
        if (search.email) {
            filtered = filtered.filter(usuario => usuario.email_usuario.toLowerCase().includes(search.email.toLowerCase()));
        }
        if (search.cpf) {
            filtered = filtered.filter(usuario => usuario.cpf_usuario.toLowerCase().includes(search.cpf.toLowerCase()));
        }
        if (search.permissao) {
            filtered = filtered.filter(usuario => usuario.permissao.toLowerCase().includes(search.permissao.toLowerCase()));
        }

        setFilteredUsuario(filtered);
    }, [search, usuario]);

    const handleExportCSV = () => {
        const csv = Papa.unparse(filteredUsuario);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'usuario.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleOpen = (usuario = null) => {
        setIsEditing(!!usuario);
        setSelectedUsuario(usuario);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUsuario(null);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Você tem certeza que quer excluir este Usuário?');
        if (confirmDelete) {
            axios.delete(`https://node-deploy-api-d20r.onrender.com/usuarios/${id}`)
                .then(() => fetchUsuario())
                .catch(error => console.error('Erro ao deletar usuario:', error));
        }
    };

    const handleClearFilters = () => {
        setSearch({
            id: '',
            nome: '',
            email: '',
            cpf: '',
            permissao: ''
        });
    };

    return (
        <div>
            <div className="main-content">
                <h1>Cadastro de Usuários</h1>
                <div className="containerButtons">
                    <div className="action-buttons">
                        <button className="export-button" onClick={handleExportCSV}>
                            <img src={exportIcon} alt="Exportar" />
                            Exportar tabela
                        </button>
                        <button className="add-button" onClick={() => handleOpen()}>
                            <img src={addIcon} alt="Adicionar" />
                            Adicionar novo Usuário
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
                                <th>ID Usuário
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
                                <th>E-mail
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='email'
                                            value={search.email}
                                            onChange={handleSearch}
                                            placeholder="Buscar por E-mail"
                                        />
                                    </div>
                                </th>
                                <th>CPF
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='cpf'
                                            value={search.cpf}
                                            onChange={handleSearch}
                                            placeholder="Buscar por CPF"
                                        />
                                    </div>
                                </th>
                                <th>Cargo
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            name='permissao'
                                            value={search.permissao}
                                            onChange={handleSearch}
                                            placeholder="Buscar por Cargo"
                                        />
                                    </div>
                                </th>
                                <th>Editar/Deletar Usuário</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsuario.length > 0 ? (
                                filteredUsuario.map((usuario) => (
                                    <tr key={usuario.id_usuario}>
                                        <td>{usuario.id_usuario}</td>
                                        <td>{usuario.nome_usuario}</td>
                                        <td>{usuario.email_usuario}</td>
                                        <td>{usuario.cpf_usuario}</td>
                                        <td>{usuario.permissao}</td>
                                        <td>
                                            <button className="edit-button" onClick={() => handleOpen(usuario)}>
                                                <img src={editIcon} alt="Editar" />
                                            </button>
                                            <button className="delete-button" onClick={() => handleDelete(usuario.id_usuario)}>
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
                <UsuarioModal
                    open={open}
                    handleClose={handleClose}
                    usuario={selectedUsuario}
                    isEditing={isEditing}
                    fetchUsuario={fetchUsuario}
                />
            </div>
        </div>
    );
};

export default CadastrodeUsuariosPage;
