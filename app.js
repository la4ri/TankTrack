const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysql = require('mysql');

const motoristaRoutes = require('./DTOS/motoristaRoutes.js');
const fornecedoresRoutes = require('./DTOS/fornecedoresRoutes.js');
const produtosRoutes = require('./DTOS/produtosRoutes.js');
const itemEstoqueRoutes = require('./DTOS/itemEstoqueRoutes.js');
const clientesRoutes = require('./DTOS/clientesRoutes.js');
const veiculosRoutes = require('./DTOS/veiculosRoutes.js');

const app = express();
app.use(bodyParser.json());


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


app.use('/', motoristaRoutes(db));
app.use('/', fornecedoresRoutes(db));
app.use('/', produtosRoutes(db));
app.use('/', itemEstoqueRoutes(db));
app.use('/', clientesRoutes(db));
app.use('/', veiculosRoutes(db));
app.use('/', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = db;
module.exports = router;
