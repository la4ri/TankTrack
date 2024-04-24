const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysql = require('mysql');

const motoristaRoutes = require('./DTOS/motoristaRoutes.js');
const fornecedoresRoutes = require('./DTOS/fornecedoresRoutes.js');
const produtosRoutes = require('./DTOS/produtosRoutes.js');
const itemEstoqueRoutes = require('./DTOS/itemEstoqueRoutes.js');
const clientesRoutes = require('./DTOS/clientesRoutes.js');

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


// Passa a conexão do banco de dados para motoristaRoutes
app.use('/', motoristaRoutes(db));
app.use('/', fornecedoresRoutes(db));
app.use('/', produtosRoutes(db));
app.use('/', itemEstoqueRoutes(db));
app.use('/', clientesRoutes(db));
app.use('/', router);

// Defina e configure a porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
module.exports = db;

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





module.exports = router;
