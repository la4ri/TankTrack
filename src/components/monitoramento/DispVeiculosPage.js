import React from 'react';
import TopBar from '../TopBar.js';
import SideBar from '../SideBar.js';
import Header from '../Header.js';
import LateralMenuMonitoramento from '../LateralMenuMonitoramento.js';
import '../../style/menu.css';

const DipsVeiculosPage = () => {
    return (
        <div>
            <div className="containerMonitoramento">
                <TopBar />
                <SideBar />
                <Header />
                <div className="content">
                    <LateralMenuMonitoramento />
                    <div className="main-section">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DipsVeiculosPage;
