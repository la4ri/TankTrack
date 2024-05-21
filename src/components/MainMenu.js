import React from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import Header from './Header';
import PortalCard from './PortalCard';
import logoPequena from '../img/logopequena.png';
import transportadoraIcon from '../img/transportadora.svg';
import monitoramentoIcon from '../img/monitoramento.svg';
import torreControleIcon from '../img/torre-controle.svg';
import '../style/menu.css';

const MainMenu = () => {
    return (
        <div>
            <TopBar />
            <SideBar />
            <Header />
            <main>
                <div className="menu">
                    <h1>Menu Principal</h1>
                    <img src={logoPequena} alt="Logo Pequena" />
                    <div className="line"></div>
                </div>
                <div className="content">
                    <p>Escolha o Portal que deseja acessar:</p>
                    <div className="portals">
                        <PortalCard
                            imgSrc={transportadoraIcon}
                            title="Transportadora"
                            description="Portal destinado ao monitoramento de produtos."
                            link="/transportadora"
                        />
                        <PortalCard
                            imgSrc={monitoramentoIcon}
                            title="Monitoramento"
                            description="Portal destinado ao monitoramento de motoristas e veículos."
                            link="/monitoramento"
                        />
                        <PortalCard
                            imgSrc={torreControleIcon}
                            title="Torre de Controle"
                            description="Portal destinado ao monitoramento da logística."
                            link="/torre-de-controle"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MainMenu;
