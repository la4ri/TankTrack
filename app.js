const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const mysql = require('mysql');
const cors = require('cors');


const motoristaRoutes = require('./routes/motoristaRoutes.js');
const fornecedoresRoutes = require('./routes/fornecedoresRoutes.js');
const produtosRoutes = require('./routes/produtosRoutes.js');
const itemEstoqueRoutes = require('./routes/itemEstoqueRoutes.js');
const clientesRoutes = require('./routes/clientesRoutes.js');
const veiculosRoutes = require('./routes/veiculosRoutes.js');
const rotasRoutes = require('./routes/rotasRoutes.js');
const sauderoutes = require('./routes/sauderoutes.js');
const viagemRoutes = require('./routes/viagemRoutes.js');
const usuarioRoutes = require('./routes/usuarioRoutes.js');
const licencaRoutes = require('./routes/licencaRoutes.js');
const manutencaoRoutes = require('./routes/manutencaoRoutes.js');
const pedidoRoutes = require('./routes/pedidoRoutes.js');
const pedido_produtoRoutes = require('./routes/pedido_produtoRoutes.js');
const permissaoRoutes = require('./routes/permissaoRoutes.js');
const login = require('./validators/login.js');



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
app.use('/', usuarioRoutes(db));
app.use('/', licencaRoutes(db));
app.use('/', manutencaoRoutes(db));
app.use('/', pedidoRoutes(db));
app.use('/', pedido_produtoRoutes(db));
app.use('/', permissaoRoutes(db));
app.use('/', login(db));


app.use('/', router);
app.use(cors());
app.use(express.json());
app.use('/api', login(db));

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = db;
module.exports = router;
