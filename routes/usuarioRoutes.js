const express = require('express');
const router = express.Router();

// Essa função receberá a conexão com o banco de dados
function usuarioRoutes(db) {

    // Cria um novo usuário
    router.post('/usuarios', (req, res) => {
        const { nome_usuario, email_usuario, senha_usuario, id_permissao  } = req.body;
        db.query('INSERT INTO Usuario (nome_usuario, email_usuario, senha_usuario, id_permissao ) VALUES (?, ?, ?, ?)',
            [nome_usuario, email_usuario, senha_usuario, id_permissao ],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao criar usuário');
                }
                res.send('Usuário criado com sucesso');
            });
    });

    // Obtém todos os usuários
    router.get('/usuarios', (req, res) => {
        db.query('SELECT * FROM Usuario', (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar usuários');
            }
            res.json(rows);
        });
    });

    // Obtém um usuário pelo ID
    router.get('/usuarios/:id', (req, res) => {
        const id_usuario = req.params.id;
        db.query('SELECT * FROM Usuario WHERE id_usuario = ?', [id_usuario], (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar usuário');
            }
            if (rows.length === 0) {
                return res.status(404).send('Usuário não encontrado');
            }
            res.json(rows[0]);
        });
    });

    // Atualiza um usuário pelo ID
    router.put('/usuarios/:id', (req, res) => {
        const id_usuario = req.params.id;
        const { nome_usuario, email_usuario, senha_usuario, id_permissao  } = req.body;
        db.query('UPDATE Usuario SET nome_usuario=?, email_usuario=?, senha_usuario=?, id_permissao=? WHERE id_usuario=?',
            [nome_usuario, email_usuario, senha_usuario, id_permissao , id_usuario],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao atualizar usuário');
                }
                res.send('Usuário atualizado com sucesso');
            });
    });

    // Deleta um usuário pelo ID
    router.delete('/usuarios/:id', (req, res) => {
        const id_usuario = req.params.id;
        db.query('DELETE FROM Usuario WHERE id_usuario = ?', [id_usuario], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao deletar usuário');
            }
            res.send('Usuário deletado com sucesso');
        });
    });

    // Obtém um usuário pelo nome
    router.get('/usuarios/nome/:nome', (req, res) => {
        const nome_usuario = req.params.nome;
        db.query('SELECT * FROM Usuario WHERE nome_usuario = ?', [nome_usuario], (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar usuário');
            }
            if (rows.length === 0) {
                return res.status(404).send('Usuário não encontrado');
            }
            res.json(rows[0]);
        });
    });

    return router;
};

module.exports = usuarioRoutes;