const express = require('express');
const router = express.Router();

// Essa função receberá a conexão com o banco de dados
function fornecedoresRoutes(db) {

    // Rota para obter todos os fornecedores
    router.get('/fornecedores', (req, res) => {
        db.query('SELECT * FROM Fornecedor', (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar fornecedores');
            }
            res.json(results);
        });
    });

    // Rota para criar um novo fornecedor
    router.post('/fornecedores', (req, res) => {
        const { nome_fornecedor, endereco_fornecedor, contato_fornecedor } = req.body;
        db.query('INSERT INTO Fornecedor (nome_fornecedor, endereco_fornecedor, contato_fornecedor) VALUES (?, ?, ?)',
            [nome_fornecedor, endereco_fornecedor, contato_fornecedor],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao criar fornecedor');
                }
                res.send('Fornecedor criado com sucesso');
            });
    });

    // Rota para atualizar um fornecedor existente
    router.put('/fornecedores/:id', (req, res) => {
        const id_fornecedor = req.params.id;
        const { nome_fornecedor, endereco_fornecedor, contato_fornecedor } = req.body;
        db.query('UPDATE Fornecedor SET nome_fornecedor=?, endereco_fornecedor=?, contato_fornecedor=? WHERE id_fornecedor=?',
            [nome_fornecedor, endereco_fornecedor, contato_fornecedor, id_fornecedor],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao atualizar fornecedor');
                }
                res.send('Fornecedor atualizado com sucesso');
            });
    });

    // Rota para excluir um fornecedor
    router.delete('/fornecedores/:id', (req, res) => {
        const id_fornecedor = req.params.id;
        db.query('DELETE FROM Fornecedor WHERE id_fornecedor=?', [id_fornecedor], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao excluir fornecedor');
            }
            res.send('Fornecedor excluído com sucesso');
        });
    });

    // Rota para obter fornecedor por nome
    router.get('/fornecedores/:nome', (req, res) => {
        const nome_fornecedor = req.params.nome;
        db.query('SELECT * FROM Fornecedor WHERE nome_fornecedor = ?', [nome_fornecedor], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar fornecedor');
            }
            res.json(results);
        });
    });
    return router;
}
module.exports = fornecedoresRoutes;