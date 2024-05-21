// LateralMenu.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../img/home.svg';
import '../style/transportadora.css';


const LateralMenu = () => {
    const [mostrarPaginas, setMostrarPaginas] = useState(true);
    const [paginaSelecionada, setPaginaSelecionada] = useState('/transportadora');

    const togglePaginas = () => {
        setMostrarPaginas(!mostrarPaginas);
    };

    useEffect(() => {
        const paginaAtual = window.location.pathname;
        setPaginaSelecionada(paginaAtual);
    }, []); // Executar apenas uma vez, ao montar o componente

    const handleSelecionarPagina = (pagina) => {
        setPaginaSelecionada(pagina);
    };

    return (
        <aside className="lateral-menu">
            <nav>
                <ul className="menu-list">
                    <li>
                        <Link to="/" className={`main-menu-link ${paginaSelecionada === '/' ? 'active' : ''}`} onClick={() => handleSelecionarPagina('/')}>
                            <img src={homeIcon} alt="Home" className="home-icon" />
                        </Link>
                    </li>
                </ul>
            </nav>
            {/* Div para envolver os botões */}
            <div className="botao-container">
                <button className="produtos-button" onClick={togglePaginas}>Produtos</button>
                <ul className={`submenu ${mostrarPaginas ? "mostrar" : ""}`}>
                    <li><Link to="/transportadora" className={paginaSelecionada === '/transportadora' ? 'active' : ''} onClick={() => handleSelecionarPagina('/transportadora')}>Recebimento de Produtos</Link></li>
                    <li><Link to="/gestao" className={paginaSelecionada === '/gestao' ? 'active' : ''} onClick={() => handleSelecionarPagina('/gestao')}>Gestão de Frota</Link></li>
                    <li><Link to="/operacao" className={paginaSelecionada === '/operacao' ? 'active' : ''} onClick={() => handleSelecionarPagina('/operacao')}>Frota em Operação</Link></li>
                </ul>
            </div>
        </aside>
    );
};

export default LateralMenu;
