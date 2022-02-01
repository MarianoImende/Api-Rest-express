const express = require('express');
const ruta = express.Router();



const usuarios = [
    {id:1, nombre:"Mariano"},
    {id:2, nombre:"Aristoteles"},
    {id:3, nombre:"Empedocles"}
]

ruta.get("/", (req,res)=> {
    //res.send(["robert","Mariano","Pedro"])
    res.send(usuarios)
});

ruta.get('/:id', (req,res)=> {
    
   /* res.send(req.params.id); para devolver un parametro del RQ */
    let usuario = usuarios.find(u=> u.id === parseInt(req.params.id));     
        if (!usuario) res.status(404).send("el usuario no se encontro");
        res.send(usuario); 
});   
//se testea con postman
ruta.post('/', (req,res) => {
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


ruta.put('/:id', (req,res) => {

   //busco si el id existe
   let usuario = existeUsuario(req.params.id);//usuarios.find(u=> u.id === parseInt(req.params.id));  usuario
   if (!usuario) res.status(404).send("el usuario no se encontro");

    
   validarUsuario(req.body.nombre)
      
                    usuario.nombre = req.body.nombre;
                    res.send(usuario)
     

        //si pasa las validaciones , realizo el update
});


ruta.delete('/:id', (req,res) => {

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

ruta.use((error, req,res,next) => {
    res.status(400).json({
    status: 'error',
    message: error.message,    
    });
});  

module.exports = ruta;