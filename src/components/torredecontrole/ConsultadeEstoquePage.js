import React from 'react';
import TopBar from '../TopBar.js';
import SideBar from '../SideBar.js';
import Header from '../Header.js';
import LateralMenuTorre from '../LateralMenuTorre.js';
import '../../style/menu.css';

const ConsultadeEstoquePage = () => {
    return (
        <div>
            <div className="containerTorre">
                <TopBar />
                <SideBar />
                <Header />
                <div className="content">
                    <LateralMenuTorre />
                    <div className="main-section">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultadeEstoquePage;
