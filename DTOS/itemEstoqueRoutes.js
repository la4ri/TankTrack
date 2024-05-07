const express = require('express');
const router = express.Router();

// Essa função receberá a conexão com o banco de dados
function itemEstoqueRoutes(db) {

    // Rota para obter todos os itens de estoque
    router.get('/estoque', (req, res) => {
        db.query('SELECT * FROM Controle_Estoque', (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar itens de estoque');
            }
            res.json(results);
        });
    });

    // Rota para obter um item de estoque por nome
    router.get('/estoque/nome/:nome', (req, res) => {
        const nome_produto = req.params.nome;
        db.query('SELECT * FROM Controle_Estoque WHERE id_produto IN (SELECT id_produto FROM Produto WHERE nome_produto = ?)', [nome_produto], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar item de estoque por nome');
            }
            res.json(results);
        });
    });

    // Rota para criar um novo item de estoque
    router.post('/estoque', (req, res) => {
        const { id_produto, quantidade_disponivel_estoque, quantidade_reservada_estoque, localizacao_estoque } = req.body;
        db.query('INSERT INTO Controle_Estoque (id_produto, quantidade_disponivel_estoque, quantidade_reservada_estoque, localizacao_estoque) VALUES (?, ?, ?, ?)',
            [id_produto, quantidade_disponivel_estoque, quantidade_reservada_estoque, localizacao_estoque],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao criar item de estoque');
                }
                res.send('Item de estoque criado com sucesso');
            });
    });

    // Rota para atualizar um item de estoque existente
    router.put('/estoque/:id', (req, res) => {
        const id_controle_estoque = req.params.id;
        const { id_produto, quantidade_disponivel_estoque, quantidade_reservada_estoque, localizacao_estoque } = req.body;
        db.query('UPDATE Controle_Estoque SET id_produto=?, quantidade_disponivel_estoque=?, quantidade_reservada_estoque=?, localizacao_estoque=? WHERE id_controle_estoque=?',
            [id_produto, quantidade_disponivel_estoque, quantidade_reservada_estoque, localizacao_estoque, id_controle_estoque],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao atualizar item de estoque');
                }
                res.send('Item de estoque atualizado com sucesso');
            });
    });

    // Rota para excluir um item de estoque
    router.delete('/estoque/:id', (req, res) => {
        const id_controle_estoque = req.params.id;
        db.query('DELETE FROM Controle_Estoque WHERE id_controle_estoque=?', [id_controle_estoque], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao excluir item de estoque');
            }
            res.send('Item de estoque excluído com sucesso');
        });
    });
    return router;
}
module.exports = itemEstoqueRoutes;