const url = "http://localhost:27017";
var lista = "";
function guardarAlumno(){
    var apellidos = document.getElementById('apellidos').value;
    var nombres = document.getElementById('nombres').value;
    var fechaNacimiento = document.getElementById('fechaNacimiento').value;
    var apellidosRepresentante = document.getElementById('apellidosRepresentante').value;
    var nombresRepresentante = document.getElementById('nombresRepresentante').value;
    var cedulaRepresentante = document.getElementById('cedulaRepresentante').value;
    var telefonoRepresentante = document.getElementById('telefonoRepresentante').value;
    var direccion = document.getElementById('direccion').value;
    var observacion = document.getElementById('observacion').value;

    var r = new XMLHttpRequest();
    r.open("POST",`${url}/guardarAlumno/${apellidos}/${nombres}/${fechaNacimiento}/${apellidosRepresentante}/${nombresRepresentante}/${cedulaRepresentante}/${telefonoRepresentante}/${direccion}/${observacion}`, true);
    r.onload = function(){
        alert(this.response);
    }
    r.send();
}

function listarAlumnos(){
    var r = new XMLHttpRequest();
    r.open("GET",`${url}/listarAlumnos`, true);
    r.onload = function(){
        var resultado = JSON.parse(this.response);
        console.log(resultado);
       
        for(var t = 0;t < resultado.length; t++){
            lista += `
                <tr>
                    <td>${resultado[t].apellidos}</td>
                    <td>${resultado[t].nombres}</td>
                    <td>${resultado[t].fechaNac}</td>
                    <td>${resultado[t].nombresRepre}</td>
                    <td>${resultado[t].cedulaRepre}</td>
                    <td>${resultado[t].telefonoRepre}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-primary" onclick="editarAlumno('${resultado[t]._id}')">Editar</button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger" onclick="borrarAlumno('${resultado[t]._id}')">Borrar</button>
                    </td>
                </tr>
            `;
        }
        document.getElementById('cuerpoTablaAlumnos').innerHTML = lista;
        lista="";
    }
    r.send();
}