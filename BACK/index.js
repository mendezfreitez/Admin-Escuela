const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.listen(27017, function(){
    console.log("Escuchando el puerto 27017");
});

mongoose.connect('mongodb://localhost:27017/escuelaDB',{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false },function(err){
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
    fechaNac:String,
    apellidosRepre: String,
    nombresRepre:String,
    cedulaRepre:String,
    telefonoRepre:String,
    direccion:String,
    observacion:String
}));

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

app.get('/listarAlumnos', function(req, res){
    modelAlumno.find(function(err, resultado){
        if(!err){
            res.send(resultado);
        }
        else{
            res.send(err);
            console.log(err);
        }
    });
});

app.get("/verAlumno/:id", function(req, res){
    modelAlumno.findById(req.params.id, function(err,resultado){
        if(err){
            res.send(err);
        }
        else{
            res.send(resultado);
        }
    });
});
//    r.open("POST",`${url}/${apellidos}/${nombres}/${fechaNacimiento}/${apellidosRepresentante}/${nombresRepresentante}/${cedulaRepresentante}/${telefonoRepresentante}/${direccion}/${observacion}/${_id}`);
app.post('/guardarEdicionAlumno/:apellidos/:nombres/:fechaNacimiento/:apellidosRepresentante/:nombresRepresentante/:cedulaRepresentante/:telefonoRepresentante/:direccion/:observacion/:_id', function(req, res){
    const unAlumno = new modelAlumno({
        apellidos:req.params.apellidos,
        nombres:req.params.nombres,
        fechaNac:req.params.fechaNacimiento,
        apellidosRepre:req.params.apellidosRepresentante,
        nombresRepre:req.params.nombresRepresentante,
        cedulaRepre:req.params.cedulaRepresentante,
        telefonoRepre:req.params.telefonoRepresentante,
        direccion:req.params.direccion,
        observacion:req.params.observacion,
        _id:req.params._id
    });
    modelAlumno.findByIdAndUpdate(req.params._id, { $set:unAlumno }, function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send("Editado exitosamente.");
        }
    });
});

app.post('/borrrarAlumno/:id', function(req, res){
    modelAlumno.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.send(err);
        }
        else{
            res.send("1");
        }
    });
});