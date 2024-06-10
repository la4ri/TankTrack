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
                    <li><Link to="/disponibilidademotoristas" className={paginaSelecionada === '/disponibilidademotoristas' ? 'active' : ''} onClick={() => handleSelecionarPagina('/disponibilidademotoristas')}>Disponibilidade</Link></li>
                    <li><Link to="/statussaude" className={paginaSelecionada === '/statussaude' ? 'active' : ''} onClick={() => handleSelecionarPagina('/statussaude')}>Status de Saúde</Link></li>
                </ul>
            </div>
            <div className="botao-container">
                <button className="produtos-button" onClick={togglePaginas}>Veículos</button>
                <ul className={`submenu ${mostrarPaginas ? "mostrar" : ""}`}>
                    <li><Link to="/cadastrosveiculos" className={paginaSelecionada === '/cadastrosveiculos' ? 'active' : ''} onClick={() => handleSelecionarPagina('/cadastrosveiculos')}>Cadastro de Veículos</Link></li>
                    <li><Link to="/disponibilidadeveiculos" className={paginaSelecionada === '/disponibilidadeveiculos' ? 'active' : ''} onClick={() => handleSelecionarPagina('/disponibilidadeveiculos')}>Disponibilidade</Link></li>
                    <li><Link to="/manutencao" className={paginaSelecionada === '/manutencao' ? 'active' : ''} onClick={() => handleSelecionarPagina('/manutencao')}>Status de Veículos</Link></li>
                </ul>
            </div>
        </aside>
    );
};

export default LateralMenu;
