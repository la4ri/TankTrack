// LateralMenu.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../img/home.svg';
import '../style/transportadora.css';


const LateralMenuTorre = () => {
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
                <button className="produtos-button" onClick={togglePaginas}>Logística</button>
                <ul className={`submenu ${mostrarPaginas ? "mostrar" : ""}`}>
                    <li><Link to="/torre-de-controle" className={paginaSelecionada === '/torre-de-controle' ? 'active' : ''} onClick={() => handleSelecionarPagina('/torre-de-controle')}>Alertas de Condução</Link></li>
                    <li><Link to="/historicodeconducao" className={paginaSelecionada === '/historicodeconducao' ? 'active' : ''} onClick={() => handleSelecionarPagina('/historicodeconducao')}>Histórico de Condução</Link></li>
                    <li><Link to="/cadastrodeusuarios" className={paginaSelecionada === '/cadastrodeusuarios' ? 'active' : ''} onClick={() => handleSelecionarPagina('/cadastrodeusuarios')}>Cadastro de Usuários</Link></li>
                    <li><Link to="/consultadeestoque" className={paginaSelecionada === '/consultadeestoque' ? 'active' : ''} onClick={() => handleSelecionarPagina('/consultadeestoque')}>Consulta de Estoque</Link></li>
                    <li><Link to="/controlederotas" className={paginaSelecionada === '/controlederotas' ? 'active' : ''} onClick={() => handleSelecionarPagina('/controlederotas')}>Controle de Rotas</Link></li>
                </ul>
            </div>
        </aside>
    );
};

export default LateralMenuTorre;
