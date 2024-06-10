// TransportadoraPage.js
import React from 'react';
import TopBar from '../TopBar.js';
import SideBar from '../SideBar.js';
import Header from '../Header.js';
import LateralMenu from '../LateralMenu.js';
import MainContent from '../MainContent.js';
import '../../style/menu.css';

const FrotaemOperacaoPage = () => {
    return (
        <div>
            <div className="containerTransportadora">
                <TopBar />
                <SideBar />
                <Header />
                <div className="content">
                    <LateralMenu />
                    <div className="main-section">
                        <MainContent />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FrotaemOperacaoPage;
