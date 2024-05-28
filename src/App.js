import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MainMenu from './components/MainMenu';
import TransportadoraPage from './components/transportadora/TransportadoraPage';
import GestaodeFrotaPage from './components/transportadora/GestaodeFrotaPage';
import FrotaemOperacaoPage from './components/transportadora/FrotaemOperacaoPage';
import MonitoramentoPage from './components/monitoramento/MonitoramentoPage';
import TorredeControlePage from './components/torredecontrole/TorredeControlePage';

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
                    <Route path="/torre-de-controle" element={<TorredeControlePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
