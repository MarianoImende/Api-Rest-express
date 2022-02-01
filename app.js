const express = require("express");
const app = express();
const logger = require('./logger');
const usuarios = require('./routes/usuarios');
//const config = require('config');
const morgan = require('morgan');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger);
app.use('/api/usuarios',usuarios);
//config de entornos    
//console.log('Aplicacion: ' + config.get('nombre'));
//console.log('ddbb: ' + config.get('configdb.host'));

//uso de middlware de terceros - morgan
app.use(morgan('tiny'));

app.get("/api/", (req,res)=> {
    //res.send(["robert","Mariano","Pedro"])
    res.send('Api test')
});

const port = process.env.port || 3000;
    console.log(port);
app.listen (port,() =>{
    console.log(`escuchando en port ${port} ...`);
})

