// LateralMenu.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../img/home.svg';
import '../style/container.css';


const LateralMenuMonitoramento = () => {
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
                <button className="produtos-button" onClick={togglePaginas}>Motoristas</button>
                <ul className={`submenu ${mostrarPaginas ? "mostrar" : ""}`}>
                    <li><Link to="/monitoramento" className={paginaSelecionada === '/monitoramento' ? 'active' : ''} onClick={() => handleSelecionarPagina('/monitoramento')}>Cadastro de Motorista</Link></li>
                    <li><Link to="/monitoramento/disponibilidademotoristas" className={paginaSelecionada === '/monitoramento/disponibilidademotoristas' ? 'active' : ''} onClick={() => handleSelecionarPagina('/monitoramento/disponibilidademotoristas')}>Disponibilidade</Link></li>
                    <li><Link to="/monitoramento/statussaude" className={paginaSelecionada === '/monitoramento/statussaude' ? 'active' : ''} onClick={() => handleSelecionarPagina('/monitoramento/statussaude')}>Status de Saúde</Link></li>
                </ul>
            </div>
            <div className="botao-container">
                <button className="produtos-button" onClick={togglePaginas}>Veículos</button>
                <ul className={`submenu ${mostrarPaginas ? "mostrar" : ""}`}>
                    <li><Link to="/monitoramento/cadastrosveiculos" className={paginaSelecionada === '/monitoramento/cadastrosveiculos' ? 'active' : ''} onClick={() => handleSelecionarPagina('/monitoramento/cadastrosveiculos')}>Cadastro de Veículos</Link></li>
                    <li><Link to="/monitoramento/disponibilidadeveiculos" className={paginaSelecionada === '/monitoramento/disponibilidadeveiculos' ? 'active' : ''} onClick={() => handleSelecionarPagina('/monitoramento/disponibilidadeveiculos')}>Disponibilidade</Link></li>
                    <li><Link to="/monitoramento/statusSaude" className={paginaSelecionada === '/monitoramento/statusSaude' ? 'active' : ''} onClick={() => handleSelecionarPagina('/monitoramento/statusSaude')}>Status de Veículos</Link></li>
                </ul>
            </div>
        </aside>
    );
};

export default LateralMenuMonitoramento;
