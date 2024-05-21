// TransportadoraPage.js
import React from 'react';
import TopBar from '../TopBar.js';
import SideBar from '../SideBar.js';
import Header from '../Header.js';
import LateralMenu from '../LateralMenu.js';
import '../../style/menu.css';

const TransportadoraPage = () => {
    return (
        <div>
            <div className="containerTransportadora">
                <TopBar />
                <SideBar />
                <Header />
                <div className="content">
                    <LateralMenu />
                    <main>
                        <h1>Portal da Transportadora</h1>
                        <p>Bem-vindo ao portal da transportadora. Aqui você pode monitorar os produtos.</p>
                        {/* Adicione mais conteúdo e componentes conforme necessário */}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default TransportadoraPage;
