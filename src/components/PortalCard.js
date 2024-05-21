// PortalCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/menu.css';

const PortalCard = ({ imgSrc, title, description, link }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link);
    };

    return (
        <div className="portal-card" onClick={handleClick}>
            <img src={imgSrc} alt={title} />
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default PortalCard;
