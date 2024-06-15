import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TopBar from './TopBar.js';
import SideBar from './SideBar.js';
import Header from './Header.js';
import LateralMenuTransportadora from './LateralMenuTransportadora.js';
import GestaodeFrotaPage from '../components/transportadora/GestaodeFrotaPage';
import RecebimentodeProdutos from './transportadora/RecebimentodeProdutos.js';
import FrotaemOperacaoPage from '../components/transportadora/FrotaemOperacaoPage';
import '../style/container.css';

const MainContentTransportadora = () => {
    return (
        <div className='main'>
            <div className="containerTransportadora">
                <TopBar />
                <SideBar />
                <Header />
                <div className="content">
                    <LateralMenuTransportadora />
                    <main>
                        <h1>Portal Transportadora</h1>
                    </main>
                    <div className="lines-container">
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                    <div className="main-section">
                        <Routes>
                            <Route path="/" element={<RecebimentodeProdutos />} />
                            <Route path="/gestao" element={<GestaodeFrotaPage />} />
                            <Route path="/operacao" element={<FrotaemOperacaoPage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContentTransportadora;
