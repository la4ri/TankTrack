import React, { useEffect, useState } from 'react';
import userIcon from '../img/usuario.svg';
import logoutIcon from '../img/logout.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [nomeUsuario, setNomeUsuario] = useState('');

    useEffect(() => {
        const nomeUsuario = localStorage.getItem('nome_usuario');
        console.log('Nome do usuário recuperado:', nomeUsuario); // Log para depuração
        if (nomeUsuario) {
            setNomeUsuario(nomeUsuario);
        }
    }, []);

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('nome_usuario');
        navigate('/');
    };

    return (
        <header className="headermenu">
            <div className="user-signal">
                <img src={userIcon} alt="Sinalizador de Usuário" />
                <span>{nomeUsuario || 'Carregando...'}</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>
                <span>Logout</span>
                <img src={logoutIcon} alt="Botão Logout" />
            </button>
        </header>
    );
};

export default Header;
