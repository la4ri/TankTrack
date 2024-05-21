import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MainMenu from './components/MainMenu';
import TransportadoraPage from './components/transportadora/TransportadoraPage';
import MonitoramentoPage from './components/monitoramento/MonitoramentoPage';
import TorredeControlePage from './components/torredecontrole/TorredeControlePage';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/menu" element={<MainMenu />} />
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/transportadora" element={<TransportadoraPage />} />
                    <Route path="/monitoramento" element={<MonitoramentoPage />} />
                    <Route path="/torre-de-controle" element={<TorredeControlePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
