const express = require('express');
const cors = require('cors');
const app = express();
const conn = require('./db/conn');
const routes = require('./routes/index');
const models = require('./models/index');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

const listen = async () => {
    try {
        await conn.sync();
        console.log('Database connected successfully');

        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

listen();
