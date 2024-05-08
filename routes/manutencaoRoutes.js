const express = require('express');
const router = express.Router();

// Essa função receberá a conexão com o banco de dados
function manutencaoRoutes(db) {

    // Rota para criar uma nova entrada de manutenção
    router.post('/manutencoes', (req, res) => {
        const { tipo_manutencao, data_manutencao, id_veiculo } = req.body;
        db.query('INSERT INTO Manutencao (tipo_manutencao, data_manutencao, id_veiculo) VALUES (?, ?, ?)',
            [tipo_manutencao, data_manutencao, id_veiculo],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao criar entrada de manutenção');
                }
                res.send('Entrada de manutenção criada com sucesso');
            });
    });

    // Rota para listar todas as entradas de manutenção
    router.get('/manutencoes', (req, res) => {
        db.query('SELECT * FROM Manutencao', (err, rows) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar entradas de manutenção');
            }
            res.json(rows);
        });
    });


    return router;
};

module.exports = manutencaoRoutes;