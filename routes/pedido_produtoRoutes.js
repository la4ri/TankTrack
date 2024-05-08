const express = require('express');
const router = express.Router();


// Esta função receberá a conexão com o banco de dados
function pedido_produtoRoutes(db) {
    // Rota para adicionar um novo pedido de produto
    router.post('/pedido-produto', (req, res) => {
        const { id_pedido, id_produto, quantidade } = req.body;
        db.query('INSERT INTO Pedido_Produto (id_pedido, id_produto, quantidade) VALUES (?, ?, ?)',
            [id_pedido, id_produto, quantidade],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao adicionar pedido de produto');
                }
                res.send('Pedido de produto adicionado com sucesso');
            });
    });

    // Rota para obter todos os pedidos de produtos
    router.get('/pedido-produto', (req, res) => {
        db.query('SELECT * FROM Pedido_Produto', (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar pedidos de produtos');
            }
            res.json(results);
        });
    });

    // Rota para obter os produtos de um pedido específico
    router.get('/pedido-produto/:id_pedido', (req, res) => {
        const id_pedido = req.params.id_pedido;
        db.query('SELECT * FROM Pedido_Produto WHERE id_pedido = ?', [id_pedido], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar pedidos de produtos');
            }
            res.json(results);
        });
    });

    // Rota para obter todas as informações relacionadas a um pedido, incluindo detalhes sobre os produtos
    router.get('/pedidos/:id', (req, res) => {
        const idPedido = req.params.id;

        // Consulta SQL para obter todas as informações relacionadas a um pedido
        const query = `
            SELECT Pedido.*, Pedido_Produto.id_produto, Produto.nome_produto, Produto.descricao_produto, Pedido_Produto.quantidade
            FROM Pedido
            JOIN Pedido_Produto ON Pedido.id_pedido = Pedido_Produto.id_pedido
            JOIN Produto ON Pedido_Produto.id_produto = Produto.id_produto
            WHERE Pedido.id_pedido = ?;
        `;

        db.query(query, [idPedido], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar informações do pedido');
            }
            res.json(results);
        });
    });


    return router;
};

module.exports = pedido_produtoRoutes;