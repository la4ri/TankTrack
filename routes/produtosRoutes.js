const express = require('express');
const router = express.Router();

// Essa função receberá a conexão com o banco de dados
function produtosRoutes(db) {

    // Rota para obter todos os produtos
    router.get('/produtos', (req, res) => {
        db.query('SELECT * FROM Produto', (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar produtos');
            }
            res.json(results);
        });
    });

    // Rota para obter um produto por ID
    router.get('/produtos/:id', (req, res) => {
        const id_produto = req.params.id;
        db.query('SELECT * FROM Produto WHERE id_produto = ?', id_produto, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar produto');
            }
            if (results.length === 0) {
                return res.status(404).send('Produto não encontrado');
            }
            res.json(results[0]);
        });
    });

    // Rota para obter um produto por nome
    router.get('/produtos/nome/:nome', (req, res) => {
        const nome_produto = req.params.nome;
        db.query('SELECT * FROM Produto WHERE nome_produto = ?', nome_produto, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar produto por nome');
            }
            if (results.length === 0) {
                return res.status(404).send('Produto não encontrado');
            }
            res.json(results[0]);
        });
    });

    // Rota para criar um novo produto
    router.post('/produtos', (req, res) => {
        const { nome_produto, descricao_produto, data_recebimento_produto, quantidade_produto, status_produto, id_fornecedor } = req.body;
        db.query('INSERT INTO Produto (nome_produto, descricao_produto, data_recebimento_produto, quantidade_produto, status_produto, id_fornecedor) VALUES (?, ?, ?, ?, ?, ?)',
            [nome_produto, descricao_produto, data_recebimento_produto, quantidade_produto, status_produto, id_fornecedor],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao criar produto');
                }
                res.send('Produto criado com sucesso');
            });
    });

    // Rota para atualizar um produto existente
    router.put('/produtos/:id', (req, res) => {
        const id_produto = req.params.id;
        const { nome_produto, descricao_produto, data_recebimento_produto, quantidade_produto, status_produto, id_fornecedor } = req.body;
        db.query('UPDATE Produto SET nome_produto=?, descricao_produto=?, data_recebimento_produto=?, quantidade_produto=?, status_produto=?, id_fornecedor=? WHERE id_produto=?',
            [nome_produto, descricao_produto, data_recebimento_produto, quantidade_produto, status_produto, id_fornecedor, id_produto],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao atualizar produto');
                }
                res.send('Produto atualizado com sucesso');
            });
    });

    // Rota para excluir um produto
    router.delete('/produtos/:id', (req, res) => {
        const id_produto = req.params.id;
        db.query('DELETE FROM Produto WHERE id_produto=?', id_produto, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao excluir produto');
            }
            res.send('Produto excluído com sucesso');
        });
    });

    return router;
}
module.exports = produtosRoutes;