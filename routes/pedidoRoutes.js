const express = require('express');
const router = express.Router();


// Função para lidar com as rotas relacionadas aos pedidos
function pedidoRoutes(db) {

    // Rota para obter todos os pedidos
    router.get('/pedidos', (req, res) => {
        db.query('SELECT * FROM Pedido', (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao buscar pedidos');
            }
            res.json(results);
        });
    });

    // Rota para criar um novo pedido
    router.post('/pedidos', (req, res) => {
        const { data_pedido, status_pedido, id_cliente } = req.body;
        db.query('INSERT INTO Pedido (data_pedido, status_pedido, id_cliente) VALUES (?, ?, ?)',
            [data_pedido, status_pedido, id_cliente],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao criar pedido');
                }
                res.send('Pedido criado com sucesso');
            });
    });

    // Rota para atualizar um pedido existente
    router.put('/pedidos/:id', (req, res) => {
        const id_pedido = req.params.id;
        const { data_pedido, status_pedido, id_cliente } = req.body;
        db.query('UPDATE Pedido SET data_pedido=?, status_pedido=?, id_cliente=? WHERE id_pedido=?',
            [data_pedido, status_pedido, id_cliente, id_pedido],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('Erro ao atualizar pedido');
                }
                res.send('Pedido atualizado com sucesso');
            });
    });

    // Rota para excluir um pedido
    router.delete('/pedidos/:id', (req, res) => {
        const id_pedido = req.params.id;
        db.query('DELETE FROM Pedido WHERE id_pedido=?', [id_pedido], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erro ao excluir pedido');
            }
            res.send('Pedido excluído com sucesso');
        });
    });


    return router;
};

module.exports = pedidoRoutes;