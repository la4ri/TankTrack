import React from 'react';
import editIcon from '../../img/edit.svg';
import '../../style/container.css';

const TransportadoraPage = () => {
    return (
        <div className="main">
            <div className="main-content">
                <h1>Recebimento de Produtos</h1>
                <div className="filters">
                    <div className="filter-group">
                        <label>Filtrar por Data Saída Origem:</label>
                        <input type="month" />
                    </div>
                    <div className="filter-group">
                        <label>Filtrar por Previsão Chegada:</label>
                        <input type="month" />
                    </div>
                    <button className="filter-button">Filtrar</button>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Origem do Produto</th>
                            <th>Data Saída Origem</th>
                            <th>Destino</th>
                            <th>Previsão de Chegada</th>
                            <th>Volume m³</th>
                            <th>Chegada Real</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Exemplo de dados estáticos */}
                        {Array(5).fill().map((_, idx) => (
                            <tr key={idx}>
                                <td>MATRIZ - BRASÍLIA</td>
                                <td>18/02/2024</td>
                                <td>FILIAL - GOIÂNIA</td>
                                <td>18/03/2024</td>
                                <td>90</td>
                                <td><button className="edit-button"><img src={editIcon} alt="Editar" /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TransportadoraPage;
