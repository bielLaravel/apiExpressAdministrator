const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db.conf.js');
const mongoose = require('mongoose');
const categoryRoutes = require('./src/routes/category.routes.js');

//Inicialitzem el servidor
const app = express();
const port = process.env.PORT || 4000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())


//DATABSE CONNECTION ? es tindria que posar en un altre fitxer ocupa massa
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});

//Middelware per poder fer servir les rutes 
app.use('/api/category', categoryRoutes)


