import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MainMenu from './components/MainMenu';
import TransportadoraPage from './components/transportadora/TransportadoraPage';
import GestaodeFrotaPage from './components/transportadora/GestaodeFrotaPage';
import FrotaemOperacaoPage from './components/transportadora/FrotaemOperacaoPage';
import MonitoramentoPage from './components/monitoramento/MonitoramentoPage';
import TorredeControlePage from './components/torredecontrole/TorredeControlePage';
import DispMotoristasPage from './components/monitoramento/DispMotoristasPage';
import StatusSaudePage from './components/monitoramento/StatusSaudePage';
import CadastrosVeiculosPage from './components/monitoramento/CadastrosVeiculosPage';
import DispVeiculosPage from './components/monitoramento/DispVeiculosPage';
import ManutencaoPage from './components/monitoramento/ManutencaoPage';
import HistoricodeConducaoPage from './components/torredecontrole/HistoricodeConducaoPage';
import CadastrodeUsuariosPage from './components/torredecontrole/CadastrodeUsuariosPage';
import ConsultadeEstoquePage from './components/torredecontrole/ConsultadeEstoquePage';
import ControledeRotasPage from './components/torredecontrole/ControledeRotasPage';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/menu" element={<MainMenu />} />
                    <Route path="/transportadora" element={<TransportadoraPage />} />
                    <Route path="/gestao" element={<GestaodeFrotaPage />} />
                    <Route path="/operacao" element={<FrotaemOperacaoPage />} />
                    <Route path="/monitoramento" element={<MonitoramentoPage />} />
                    <Route path="/disponibilidademotoristas" element={<DispMotoristasPage />} />
                    <Route path="/statussaude" element={<StatusSaudePage />} />
                    <Route path="/cadastrosveiculos" element={<CadastrosVeiculosPage />} />
                    <Route path="/disponibilidadeveiculos" element={<DispVeiculosPage />} />
                    <Route path="/manutencao" element={<ManutencaoPage />} />
                    <Route path="/torre-de-controle" element={<TorredeControlePage />} />
                    <Route path="/historicodeconducao" element={<HistoricodeConducaoPage />} />
                    <Route path="/cadastrodeusuarios" element={<CadastrodeUsuariosPage />} />
                    <Route path="/consultadeestoque" element={<ConsultadeEstoquePage />} />
                    <Route path="/controlederotas" element={<ControledeRotasPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
