// LateralMenu.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../img/home.svg';
import '../style/container.css';


const LateralMenuTransportadora = () => {
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
                        <Link to="/menu" className={`main-menu-link ${paginaSelecionada === '/menu' ? 'active' : ''}`} onClick={() => handleSelecionarPagina('/menu')}>
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
                    <li><Link to="/transportadora/gestao" className={paginaSelecionada === '/transportadora/gestao' ? 'active' : ''} onClick={() => handleSelecionarPagina('/transportadora/gestao')}>Gestão de Frota</Link></li>
                    <li><Link to="/transportadora/operacao" className={paginaSelecionada === '/transportadora/operacao' ? 'active' : ''} onClick={() => handleSelecionarPagina('/transportadora/operacao')}>Frota em Operação</Link></li>
                </ul>
            </div>
        </aside>
    );
};

export default LateralMenuTransportadora;
