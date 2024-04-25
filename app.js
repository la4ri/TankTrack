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
const rotasRoutes = require('./DTOS/rotasRoutes.js');
const sauderoutes = require('./DTOS/sauderoutes.js');
const viagemRoutes = require('./DTOS/viagemRoutes.js');

const app = express();
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: "monorail.proxy.rlwy.net",
    port: 19967,
    user: 'root',
    password: 'fiGARhOKCvylUtemfLFSvzIIPlMsLauD',
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
app.use('/', rotasRoutes(db));
app.use('/', sauderoutes(db));
app.use('/', viagemRoutes(db));
app.use('/', router);


const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = db;
module.exports = router;
