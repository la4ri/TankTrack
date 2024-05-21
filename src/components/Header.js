import React from 'react';
import userIcon from '../img/usuario.svg';
import logoutIcon from '../img/logout.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        navigate('/');
    };
    return (
        <header class="headermenu">
            <div className="user-signal">
                <img src={userIcon} alt="Sinalizador de Usuário" />
                <span>Nome do Usuário</span>
            </div>
            <button className="logout-button" onClick={handleLogout}>
                <span>Logout</span>
                <img src={logoutIcon} alt="Botão Logout" />
            </button>
        </header >
    );
};

export default Header;
