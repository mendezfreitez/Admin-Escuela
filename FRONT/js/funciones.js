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
        //console.log(resultado);
       
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
                        <button data-toggle="pill" href="#pills-alumno" class="btn btn-sm btn-primary" onclick="verAlumno('${resultado[t]._id}')">Ver</button>
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

function verAlumno(id){

    var r = new XMLHttpRequest();
    r.open("GET","../VIEWS/verAlumno.html");
    r.onload = function(){
        document.getElementById('pills-alumno').innerHTML = this.response;

        var rr = new XMLHttpRequest();
        rr.open("GET", `${url}/verAlumno/${id}`);
        rr.onload = function(){
            console.log(JSON.parse(this.response));
            var dato = JSON.parse(this.response);
            document.getElementById('apellidos2').value = dato.nombres;
            document.getElementById('nombres2').value = dato.apellidos;
            document.getElementById('fechaNacimiento2').value = dato.fechaNac;
            document.getElementById('apellidosRepresentante2').value = dato.apellidosRepre;
            document.getElementById('nombresRepresentante2').value = dato.nombresRepre;
            document.getElementById('cedulaRepresentante2').value = dato.cedulaRepre;
            document.getElementById('telefonoRepresentante2').value = dato.telefonoRepre;
            document.getElementById('direccion2').value = dato.direccion;
            document.getElementById('observacion2').value = dato.observacion;
        }
        rr.send();
    }
    r.send();




}

function editarAlumno(){
    document.getElementById('btnGuardarEdicionAlumno').setAttribute('style','display:inline-block;');
    document.getElementById('btnEditarAlumno').setAttribute('style','display:none;');
    document.getElementById('apellidos2').removeAttribute('disabled');
    document.getElementById('nombres2').removeAttribute('disabled');
    document.getElementById('fechaNacimiento2').removeAttribute('disabled');
    document.getElementById('apellidosRepresentante2').removeAttribute('disabled');
    document.getElementById('nombresRepresentante2').removeAttribute('disabled');
    document.getElementById('cedulaRepresentante2').removeAttribute('disabled');
    document.getElementById('telefonoRepresentante2').removeAttribute('disabled');
    document.getElementById('direccion2').removeAttribute('disabled');
    document.getElementById('observacion2').removeAttribute('disabled');
}

function guardarEdicionAlumno(){

}