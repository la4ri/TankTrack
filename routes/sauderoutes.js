const express = require('express');
const router = express.Router();

function sauderoutes(db) {

    // Rota para obter todos os registros de saúde
    router.get('/saude', (req, res) => {
        db.query('SELECT * FROM Saude', (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar registros de saúde');
            }
            res.json(results);
        });
    });

    // Rota para criar um novo registro de saúde
    router.post('/saude', (req, res) => {
        const { tipo_exame_saude, data_exame_saude, resultado_exame_saude, observacao_saude, id_motorista } = req.body;
        db.query('INSERT INTO Saude (tipo_exame_saude, data_exame_saude, resultado_exame_saude, observacao_saude, id_motorista) VALUES (?, ?, ?, ?, ?)',
            [tipo_exame_saude, data_exame_saude, resultado_exame_saude, observacao_saude, id_motorista],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao criar registro de saúde');
                }
                res.send('Registro de saúde criado com sucesso');
            });
    });

    // Rota para atualizar um registro de saúde existente
    router.put('/saude/:id', (req, res) => {
        const id_saude = req.params.id;
        const { tipo_exame_saude, data_exame_saude, resultado_exame_saude, observacao_saude, id_motorista } = req.body;
        db.query('UPDATE Saude SET tipo_exame_saude=?, data_exame_saude=?, resultado_exame_saude=?, observacao_saude=?, id_motorista=? WHERE id_saude=?',
            [tipo_exame_saude, data_exame_saude, resultado_exame_saude, observacao_saude, id_motorista, id_saude],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao atualizar registro de saúde');
                }
                res.send('Registro de saúde atualizado com sucesso');
            });
    });

    // Rota para excluir um registro de saúde
    router.delete('/saude/:id', (req, res) => {
        const id_saude = req.params.id;
        db.query('DELETE FROM Saude WHERE id_saude=?', [id_saude], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao excluir registro de saúde');
            }
            res.send('Registro de saúde excluído com sucesso');
        });
    });

    // Rota para buscar registros de saúde por nome do motorista
    router.get('/saude/nome/:nome', (req, res) => {
        const nomeMotorista = req.params.nome;
        const query = `
        SELECT Saude.*
        FROM Saude
        INNER JOIN Motorista ON Saude.id_motorista = Motorista.id_motorista
        WHERE Motorista.nome_motorista LIKE ?
    `;
        db.query(query, [`%${nomeMotorista}%`], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar registros de saúde por nome do motorista');
            }
            res.json(results);
        });
    });

    // Rota para buscar registros de saúde por ID do motorista
    router.get('/saude/id/:id', (req, res) => {
        const idMotorista = req.params.id;
        const query = `
        SELECT Saude.*
        FROM Saude
        WHERE Saude.id_motorista = ?
    `;
        db.query(query, [idMotorista], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar registros de saúde por ID do motorista');
            }
            res.json(results);
        });
    });

    // Rota para buscar registros de saúde por CNH do motorista
    router.get('/saude/cnh/:cnh', (req, res) => {
        const cnhMotorista = req.params.cnh;
        const query = `
        SELECT Saude.*
        FROM Saude
        INNER JOIN Motorista ON Saude.id_motorista = Motorista.id_motorista
        WHERE Motorista.cnh_motorista = ?
    `;
        db.query(query, [cnhMotorista], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar registros de saúde por CNH do motorista');
            }
            res.json(results);
        });
    });

    return router;
}
module.exports = sauderoutes;