import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import MainMenu from './components/MainMenu';
import MainContentTransportadora from './components/MainContentTransportadora';
import MainContentMonitoramento from './components/MainContentMonitoramento';
import MainContentTorredeControle from './components/MainContentTorredeControle';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/menu" element={<MainMenu />} />
                    <Route path="/transportadora/*" element={<MainContentTransportadora />} />
                    <Route path="/monitoramento/*" element={<MainContentMonitoramento />} />
                    <Route path="/torre-de-controle/*" element={<MainContentTorredeControle />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
