const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Configuração do MySQL
const db = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'railway'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conexão bem-sucedida ao MySQL');
    }
});

// Use as rotas definidas em routes.js
app.use('/', router); // Altere de 'routes' para 'router'

// Defina e configure a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

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


//------------------------------------------------------------------------------------------------------------


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


// ----------------------------------------------------------------------------------------------------------

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



// ---------------------------------------------------------------------------------------------------------------

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

module.exports = router;
