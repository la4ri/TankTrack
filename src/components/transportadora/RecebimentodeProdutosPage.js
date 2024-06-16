import React, { useState, useEffect } from 'react';
import axios from 'axios';
import editIcon from '../../img/edit.svg';
import '../../style/container.css';

const RecebimentodeProdutosPage = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtosOriginais, setProdutosOriginais] = useState([]); // Armazena a lista completa de produtos
    const [filtroDataSaida, setFiltroDataSaida] = useState('');
    const [filtroDataChegada, setFiltroDataChegada] = useState('');

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = () => {
        const url = 'https://node-deploy-api-d20r.onrender.com/produtos';
        axios.get(url)
            .then(response => {
                setProdutos(response.data);
                setProdutosOriginais(response.data); // Armazena a lista completa de produtos
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    };

    const handleFiltrar = () => {
        let produtosFiltrados = [...produtosOriginais]; // Use a lista completa para filtrar

        if (filtroDataSaida) {
            produtosFiltrados = produtosFiltrados.filter(produto => {
                const dataSaida = formatDate(produto.data_recebimento_produto);
                return dataSaida === filtroDataSaida;
            });
        }

        // if (filtroDataChegada) {
        //     produtosFiltrados = produtosFiltrados.filter(produto => {
        //         const dataChegada = formatDate(produto.data_previsao_chegada);
        //         return dataChegada === filtroDataChegada;
        //     });
        // }

        setProdutos(produtosFiltrados);
    };

    const handleLimparFiltros = () => {
        setFiltroDataSaida('');
        setFiltroDataChegada('');
        setProdutos(produtosOriginais); // Restaura a lista completa de produtos
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="main">
            <div className="main-content">
                <h1>Recebimento de Produtos</h1>
                <div className="filters">
                    <div className="filter-group">
                        <label>Filtrar por Data Saída Origem:</label>
                        <input
                            type="date"
                            value={filtroDataSaida}
                            onChange={(e) => setFiltroDataSaida(e.target.value)}
                        />
                    </div>
                    {/* <div className="filter-group">
                        <label>Filtrar por Previsão Chegada:</label>
                        <input
                            type="date"
                            value={filtroDataChegada}
                            onChange={(e) => setFiltroDataChegada(e.target.value)}
                        />
                    </div> */}
                </div>
                <div className='container-filter-buttons'>
                    <button className="filter-button" onClick={handleFiltrar}>
                        Filtrar
                    </button>
                    <button className="clear-button" onClick={handleLimparFiltros}>
                        Limpar Filtros
                    </button>
                </div>

                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Origem do Produto</th>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Data Saída Origem</th>
                            <th>Destino</th>
                            {/* <th>Previsão de Chegada</th> */}
                            <th>Volume m³</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.length > 0 ? (
                            produtos.map((produto) => (
                                <tr key={produto.id_produto}>
                                    <td>FILIAL - GOIÂNIA</td> {/* Ajustar conforme necessário */}
                                    <td>{produto.nome_produto}</td>
                                    <td>{produto.descricao_produto}</td>
                                    <td>{formatDate(produto.data_recebimento_produto)}</td>
                                    <td>SEDE - MATRIZ</td> {/* Ajustar conforme necessário */}
                                    {/* <td>{formatDate(produto.data_previsao_chegada)}</td> */}
                                    <td>{produto.quantidade_produto}</td>
                                    <td><button className="edit-button"><img src={editIcon} alt="Editar" /></button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>Não há produtos recebidos para mostrar</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecebimentodeProdutosPage;
