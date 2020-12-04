const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/properties');
const connectAtlas = require('./config/mongoDBAtlas');
const app = express();

connectAtlas();

app.use(cors());

app.use(express.json()); // parse application/json

// app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use('/api', require('./test_blockchain'));

app.listen(PORT, '0.0.0.0', () => console.log(`Escuchando por el puerto ${PORT}`));