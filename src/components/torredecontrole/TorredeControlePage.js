// MonitoramentoPage.js
import React from 'react';
import TopBar from '../TopBar.js';
import SideBar from '../SideBar.js';
import Header from '../Header.js';
import '../../style/menu.css';

const TorredeControlePage = () => {
    return (
        <div>
            <TopBar />
            <SideBar />
            <Header />
            <main>
                <h1>Portal TorredeControle</h1>
                <p>Bem-vindo ao portal da TorredeControle. Aqui você pode monitorar os produtos.</p>
                {/* Adicione mais conteúdo e componentes conforme necessário */}
            </main>
        </div>
    );
};

export default TorredeControlePage;
