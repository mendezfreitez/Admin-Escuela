var url = "http://localhost:27017";
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