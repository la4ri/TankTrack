import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TopBar from './TopBar.js';
import SideBar from './SideBar.js';
import Header from './Header.js';
import LateralMenuTorre from './LateralMenuTorre.js';
import HistoricodeConducaoPage from '../components/torredecontrole/HistoricodeConducaoPage';
import CadastrodeUsuariosPage from '../components/torredecontrole/CadastrodeUsuariosPage';
import ConsultadeEstoquePage from '../components/torredecontrole/ConsultadeEstoquePage';
import ControledeRotasPage from '../components/torredecontrole/ControledeRotasPage';
import AlertasdeConducao from './torredecontrole/AlertasdeConducao.js';
import '../style/container.css';

const MainContentTorredeControle = () => {
    return (
        <div className='main'>
            <div className="containerTransportadora">
                <TopBar />
                <SideBar />
                <Header />
                <div className="content">
                    <LateralMenuTorre />
                    <main>
                        <h1>Portal Torre de Controle</h1>
                    </main>
                    <div className="lines-container">
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="main-section">
                        <Routes>
                            <Route path="/" element={<AlertasdeConducao />} />
                            <Route path="/torre-de-controle/*" element={<MainContentTorredeControle />} />
                            <Route path="/historicodeconducao" element={<HistoricodeConducaoPage />} />
                            <Route path="/cadastrodeusuarios" element={<CadastrodeUsuariosPage />} />
                            <Route path="/consultadeestoque" element={<ConsultadeEstoquePage />} />
                            <Route path="/controlederotas" element={<ControledeRotasPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContentTorredeControle
