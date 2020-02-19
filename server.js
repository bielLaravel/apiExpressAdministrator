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
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
   });
  // log errors to console
   app.use(logErrors);
    //
   app.use(clientErrorHandler);
   app.use((error, req, res, next) => {
   res.status(error.status || 500);
     return res.json({
     status:error.status || 500,
     message: error.message,
     error: {
     error: error.message,
     },
   });
  });

// log errors to console
function logErrors(err, req, res, next) {
 console.error(err.stack);
 next(err);
}
// error handling for xhr request
function clientErrorHandler(err, req, res, next) {
 if (req.xhr) {
   //console.log('xhr request');
   res.status(400).send({status: 400, message: "Bad request from client", error: err.message });
 } else {
   next(err);
 }
}

app.listen(port, () => {
 console.log(`Listening on port ${port}`);
});

console.log(port)