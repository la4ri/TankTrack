const express = require('express');
const router = express.Router();


// Esta função receberá a conexão com o banco de dados
function permissaoRoutes(db) {

    // Rota para obter todas as permissões
    router.get('/permissoes', (req, res) => {
        db.query('SELECT * FROM Permissao', (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar permissões');
            }
            res.json(results);
        });
    });

    // Rota para criar uma nova permissão
    router.post('/permissoes', (req, res) => {
        const { descricao_permissao, nivel_acesso_permissao } = req.body;
        db.query('INSERT INTO Permissao (descricao_permissao, nivel_acesso_permissao) VALUES (?, ?)',
            [descricao_permissao, nivel_acesso_permissao],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao criar permissão');
                }
                res.send('Permissão criada com sucesso');
            });
    });

    // Rota para atualizar uma permissão existente
    router.put('/permissoes/:id', (req, res) => {
        const id_permissao = req.params.id;
        const { descricao_permissao, nivel_acesso_permissao } = req.body;
        db.query('UPDATE Permissao SET descricao_permissao=?, nivel_acesso_permissao=? WHERE id_permissao=?',
            [descricao_permissao, nivel_acesso_permissao, id_permissao],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao atualizar permissão');
                }
                res.send('Permissão atualizada com sucesso');
            });
    });

    // Rota para excluir uma permissão
    router.delete('/permissoes/:id', (req, res) => {
        const id_permissao = req.params.id;
        db.query('DELETE FROM Permissao WHERE id_permissao=?', [id_permissao], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao excluir permissão');
            }
            res.send('Permissão excluída com sucesso');
        });
    });

    return router;
};

module.exports = permissaoRoutes;