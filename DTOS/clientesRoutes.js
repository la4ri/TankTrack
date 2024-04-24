const express = require('express');
const router = express.Router();

// Essa função receberá a conexão com o banco de dados
function clientesRoutes(db) {

    // Rota para obter todos os clientes
    router.get('/clientes', (req, res) => {
        db.query('SELECT * FROM Cliente', (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar clientes');
            }
            res.json(results);
        });
    });

    // Rota para listar cliente por nome
    router.get('/clientes/:nome', (req, res) => {
        const nome_cliente = req.params.nome;
        db.query('SELECT * FROM Cliente WHERE nome_cliente = ?', [nome_cliente], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar cliente por nome');
            }
            res.json(results);
        });
    });

    // Rota para criar um novo cliente
    router.post('/clientes', (req, res) => {
        const { nome_cliente, endereco_cliente, contato_cliente } = req.body;
        db.query('INSERT INTO Cliente (nome_cliente, endereco_cliente, contato_cliente) VALUES (?, ?, ?)',
            [nome_cliente, endereco_cliente, contato_cliente],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao criar cliente');
                }
                res.send('Cliente criado com sucesso');
            });
    });

    // Rota para atualizar um cliente existente
    router.put('/clientes/:id', (req, res) => {
        const id_cliente = req.params.id;
        const { nome_cliente, endereco_cliente, contato_cliente } = req.body;
        db.query('UPDATE Cliente SET nome_cliente=?, endereco_cliente=?, contato_cliente=? WHERE id_cliente=?',
            [nome_cliente, endereco_cliente, contato_cliente, id_cliente],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao atualizar cliente');
                }
                res.send('Cliente atualizado com sucesso');
            });
    });

    // Rota para excluir um cliente
    router.delete('/clientes/:id', (req, res) => {
        const id_cliente = req.params.id;
        db.query('DELETE FROM Cliente WHERE id_cliente=?', [id_cliente], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao excluir cliente');
            }
            res.send('Cliente excluído com sucesso');
        });
    });
    return router;
}
module.exports = clientesRoutes;