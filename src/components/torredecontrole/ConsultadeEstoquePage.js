import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../style/container.css';

const ConsultadeEstoquePage = () => {
    const [produtos, setProdutos] = useState([]);
    const [estoque, setEstoque] = useState([]);
    const [produtosComEstoque, setProdutosComEstoque] = useState([]);
    const [totalCombustivel, setTotalCombustivel] = useState({});

    useEffect(() => {
        fetchProdutos();
    }, []);

    useEffect(() => {
        if (produtos.length) {
            fetchEstoque();
        }
    }, [produtos]);

    useEffect(() => {
        if (produtos.length && estoque.length) {
            combinarDados();
        }
    }, [produtos, estoque]);

    const fetchProdutos = () => {
        const url = 'https://node-deploy-api-d20r.onrender.com/produtos';
        axios.get(url)
            .then(response => {
                const produtosComDataOrigem = response.data.filter(produto => produto.data_recebimento_produto);
                setProdutos(produtosComDataOrigem);
                console.log("Produtos com data de origem:", produtosComDataOrigem);
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    };

    const fetchEstoque = () => {
        const url = 'https://node-deploy-api-d20r.onrender.com/estoque';
        axios.get(url)
            .then(response => {
                setEstoque(response.data);
                console.log("Estoque:", response.data);
            })
            .catch(error => console.error('Erro ao buscar estoque:', error));
    };

    const combinarDados = () => {
        const produtosComEstoque = produtos.map(produto => {
            const dadosEstoque = estoque.find(estoqueItem => estoqueItem.id_produto === produto.id_produto) || {};
            return { ...produto, ...dadosEstoque };
        });

        setProdutosComEstoque(produtosComEstoque);
        console.log("Produtos combinados:", produtosComEstoque);
        calcularTotalCombustivel(produtosComEstoque);
    };

    const calcularTotalCombustivel = (produtos) => {
        const total = produtos.reduce((acc, produto) => {
            acc[produto.nome_produto] = (acc[produto.nome_produto] || 0) + (produto.quantidade_disponivel_estoque || 0);
            return acc;
        }, {});
        setTotalCombustivel(total);
        console.log("Total de combustível:", total);
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
                <h1>Consulta de Estoque</h1>
                <div className="totals">
                    {Object.keys(totalCombustivel).map((produto, index) => (
                        <div key={index} className="total-item">
                            <span>{produto}: </span>
                            <span>{totalCombustivel[produto]} m³</span>
                        </div>
                    ))}
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>ID do Produto</th>
                            <th>Produto</th>
                            <th>Data de Origem</th>
                            <th>Quantidade Disponível</th>
                            <th>Quantidade Reservada</th>
                            <th>Localização</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtosComEstoque.length > 0 ? (
                            produtosComEstoque.map((produto) => (
                                <tr key={produto.id_produto}>
                                    <td>{produto.id_produto}</td>
                                    <td>{produto.nome_produto}</td>
                                    <td>{produto.data_recebimento_produto ? formatDate(produto.data_recebimento_produto) : 'N/A'}</td>
                                    <td>{produto.quantidade_disponivel_estoque || 0}</td>
                                    <td>{produto.quantidade_reservada_estoque || 0}</td>
                                    <td>{produto.localizacao_estoque || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>Não há produtos em estoque para mostrar</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ConsultadeEstoquePage;
