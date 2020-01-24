const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.listen(27017, function(){
    console.log("Escuchando el puerto 27017");
});

mongoose.connect('mongodb://localhost:27017/escuelaDB',{ useNewUrlParser: true, useUnifiedTopology: true },function(err){
    if(err) {
        console.log("ERROR = " + err);
    }
    else{
        console.log("Conectado a mongoDB.");
    }
});

const modelAlumno = mongoose.model("alumnos", mongoose.Schema({
    apellidos:String,
    nombres:String,
    fechaNac:Date,
    apellidosRepre: String,
    nombresRepre:String,
    cedulaRepre:String,
    telefonoRepre:String,
    direccion:String,
    observacion:String
}));

//${apellidos}/${nombres}/${fechaNacimiento}/${apellidosRepresentante}/${nombresRepresentante}/${cedulaRepresentante}/${telefonoRepresentante}/${direccion}/${observaacion}
app.post("/guardarAlumno/:apellidos/:nombres/:fechaNacimiento/:apellidosRepresentante/:nombresRepresentante/:cedulaRepresentante/:telefonoRepresentante/:direccion/:observacion", function(req, res){
   const alumno = new modelAlumno({
    apellidos:req.params.apellidos,
    nombres:req.params.nombres,
    fechaNac:req.params.fechaNacimiento,
    apellidosRepre: req.params.apellidosRepresentante,
    nombresRepre:req.params.nombresRepresentante,
    cedulaRepre:req.params.cedulaRepresentante,
    telefonoRepre:req.params.telefonoRepresentante,
    direccion:req.params.direccion,
    observacion:req.params.observacion
   });

   alumno.save(function(err){
       if(!err){
           res.send("Guardado con éxito.");
       }
       else{
           res.send(err);
       }
   });
});