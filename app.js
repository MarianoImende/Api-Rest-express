const express = require("express");
const app = express();
const logger = require('./logger');
//const config = require('config');
const morgan = require('morgan');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger);

//config de entornos    
//console.log('Aplicacion: ' + config.get('nombre'));
//console.log('ddbb: ' + config.get('configdb.host'));

//uso de middlware de terceros - morgan
app.use(morgan('tiny'));

const usuarios = [
    {id:1, nombre:"Mariano"},
    {id:2, nombre:"Aristoteles"},
    {id:3, nombre:"Empedocles"}
]

app.get("/api/usuarios", (req,res)=> {
    //res.send(["robert","Mariano","Pedro"])
    res.send(usuarios)
});

app.get('/api/usuarios/:id', (req,res)=> {
    
   /* res.send(req.params.id); para devolver un parametro del RQ */
    let usuario = usuarios.find(u=> u.id === parseInt(req.params.id));     
        if (!usuario) res.status(404).send("el usuario no se encontro");
        res.send(usuario); 
});   
//se testea con postman
app.post('/api/usuarios', (req,res) => {
     //valido que nombre sea <> a ''
     //if (!req.body.nombre){
        //400 bad request
       //res.status(400).send('debe ingresar un nombre')
       // return;
    //} 

      validarUsuario(req.body.nombre)
    
     const usuario = {
         id: usuarios.length + 1,
         nombre: req.body.nombre
     };
     usuarios.push(usuario);

     res.send(req.body.nombre);//anda
      
      //if (req.body.nombre.length <= 2) {
      //  res.status(400).send('la long del nombre debe ser mayor de 2')
      //  return;
     
});


app.put('/api/usuarios/:id', (req,res) => {

   //busco si el id existe
   let usuario = existeUsuario(req.params.id);//usuarios.find(u=> u.id === parseInt(req.params.id));  usuario
   if (!usuario) res.status(404).send("el usuario no se encontro");

    
   validarUsuario(req.body.nombre)
      
                    usuario.nombre = req.body.nombre;
                    res.send(usuario)
     

        //si pasa las validaciones , realizo el update
});


app.delete('/api/usuarios/:id', (req,res) => {

    //busco si el id existe
    let usuario = existeUsuario(req.params.id);//usuarios.find(u=> u.id === parseInt(req.params.id));     
    if (!usuario){
        res.status(404).send("el usuario no se encontro");   
    return;
    }

        const index = usuarios.indexOf(usuario)
        usuarios.splice(index,1);
     
                     res.send(usuario)
 });


function existeUsuario(id) {
    return (usuarios.find(u=> u.id === parseInt(id)));
} 


function validarUsuario(nombre) {
    //valido que nombre sea <> a ''
        if (!nombre){
            throw new Error ('debe ingresar un nombre');
        }
        if (nombre == "a") {
            throw new Error('el nombre no debe ser a')
        }
        if (nombre.length <= 2) {             
             throw new Error('la long del nombre debe ser mayor de 2')
        }

}


const port = process.env.port || 3000;
    console.log(port);
app.listen (port,() =>{
    console.log(`escuchando en port ${port} ...`);
})

app.use((error, req,res,next) => {
    res.status(400).json({
    status: 'error',
    message: error.message,    
    });
}); 