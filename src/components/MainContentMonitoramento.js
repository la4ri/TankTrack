import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TopBar from './TopBar.js';
import SideBar from './SideBar.js';
import Header from './Header.js';
import LateralMenuMonitoramento from './LateralMenuMonitoramento.js';
import CadastrodeMotoristaPage from './monitoramento/CadastrodeMotoristaPage.js';
import DispMotoristasPage from '../components/monitoramento/DispMotoristasPage';
import StatusSaudePage from '../components/monitoramento/StatusSaudePage';
import CadastrosVeiculosPage from '../components/monitoramento/CadastrosVeiculosPage';
import DispVeiculosPage from '../components/monitoramento/DispVeiculosPage';
import ManutencaoPage from '../components/monitoramento/ManutencaoPage';
import '../style/menu.css';

const MainContentMonitoramento = () => {

    return (
        <div className='main'>
            <div className="containerTransportadora">
                <TopBar />
                <SideBar />
                <Header />
                <div className="content">
                    <LateralMenuMonitoramento />
                    <main>
                        <h1>Portal Monitoramento</h1>
                    </main>
                    <div className="lines-container">
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="main-section">
                        <Routes>
                            <Route path="/" element={<CadastrodeMotoristaPage />} />
                            <Route path="/disponibilidademotoristas" element={<DispMotoristasPage />} />
                            <Route path="/statussaude" element={<StatusSaudePage />} />
                            <Route path="/cadastrosveiculos" element={<CadastrosVeiculosPage />} />
                            <Route path="/disponibilidadeveiculos" element={<DispVeiculosPage />} />
                            <Route path="/manutencao" element={<ManutencaoPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContentMonitoramento;
