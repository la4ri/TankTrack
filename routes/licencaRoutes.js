const express = require('express');
const router = express.Router();

// Essa função receberá a conexão com o banco de dados
function licencaRoutes(db) {

    // Rota para criar uma nova licença
    router.post('/licencas', (req, res) => {
        const { numero_cnh_licenca, categoria_cnh_licenca, data_emissao_licenca, data_validade_licenca, id_motorista } = req.body;
        db.query('INSERT INTO Licenca (numero_cnh_licenca, categoria_cnh_licenca, data_emissao_licenca, data_validade_licenca, id_motorista) VALUES (?, ?, ?, ?, ?)',
            [numero_cnh_licenca, categoria_cnh_licenca, data_emissao_licenca, data_validade_licenca, id_motorista],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao criar licença');
                }
                res.send('Licença criada com sucesso');
            });
    });

    // Rota para buscar uma licença pelo ID
    router.get('/licencas/:id', (req, res) => {
        const id_licenca = req.params.id;
        db.query('SELECT * FROM Licenca WHERE id_licenca = ?', [id_licenca], (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar licença');
            }
            if (rows.length === 0) {
                return res.status(404).send('Licença não encontrada');
            }
            res.json(rows[0]);
        });
    });

    // Rota para atualizar uma licença existente
    router.put('/licencas/:id', (req, res) => {
        const id_licenca = req.params.id;
        const { numero_cnh_licenca, categoria_cnh_licenca, data_emissao_licenca, data_validade_licenca, id_motorista } = req.body;
        db.query('UPDATE Licenca SET numero_cnh_licenca=?, categoria_cnh_licenca=?, data_emissao_licenca=?, data_validade_licenca=?, id_motorista=? WHERE id_licenca=?',
            [numero_cnh_licenca, categoria_cnh_licenca, data_emissao_licenca, data_validade_licenca, id_motorista, id_licenca],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao atualizar licença');
                }
                res.send('Licença atualizada com sucesso');
            });
    });

    // Rota para excluir uma licença
    router.delete('/licencas/:id', (req, res) => {
        const id_licenca = req.params.id;
        db.query('DELETE FROM Licenca WHERE id_licenca = ?', [id_licenca], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao excluir licença');
            }
            res.send('Licença excluída com sucesso');
        });
    });

    // Rota para listar todas as licenças
    router.get('/licencas', (req, res) => {
        db.query('SELECT * FROM Licenca', (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar licenças');
            }
            res.json(rows);
        });
    });

    return router;
};

module.exports = licencaRoutes;