const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });



const conectarDB = async () => {
    
    try {
        await mongoose.connect("mongodb+srv://faceless:o5v7tuqIpChp3TdH@cluster0.erp3c.mongodb.net/blockhain?retryWrites=true",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB Atlas Conectado')
    } catch (error) {
        console.log(error);
        process.exit(1);  // Detiene la app
    }    
}

module.exports = conectarDB;
