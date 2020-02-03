const url = "http://localhost:27017";
document.getElementById('pills-home-tab').classList.remove('active');
var lista = "";

function traerMaestros(){
    var r = new XMLHttpRequest();
    r.open("GET", `${url}/traerMaestros`, true);
    r.onload = function(){
        var listaMaestros = JSON.parse(this.response);
        var lista = "<option value=\"\">Seleccione</option>";

        //console.log(listaMaestros);
        for(var t = 0; t < listaMaestros.length; t++){
            lista += `<option value=\"${listaMaestros[t]._id}\">${listaMaestros[t].apellidos} ${listaMaestros[t].nombres}</option>`;
        }
        document.getElementById('selectMaestros').innerHTML = lista;
    }
    r.send();
}

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
    var idMaestro = document.getElementById('selectMaestros').value;

    var r = new XMLHttpRequest();
    r.open("POST",`${url}/guardarAlumno/${apellidos}/${nombres}/${fechaNacimiento}/${apellidosRepresentante}/${nombresRepresentante}/${cedulaRepresentante}/${telefonoRepresentante}/${direccion}/${observacion}/${idMaestro}`, true);
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
                        <button data-toggle="pill" href="#pills-alumno" class="btn btn-sm btn-outline-success" onclick="verAlumno('${resultado[t]._id}')">Ver</button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" onclick="borrarAlumno('${resultado[t]._id}')">Borrar</button>
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
            var dato = JSON.parse(this.response);
            document.getElementById('apellidos2').value = dato.apellidos;
            document.getElementById('nombres2').value = dato.nombres;
            document.getElementById('fechaNacimiento2').value = dato.fechaNac;
            document.getElementById('apellidosRepresentante2').value = dato.apellidosRepre;
            document.getElementById('nombresRepresentante2').value = dato.nombresRepre;
            document.getElementById('cedulaRepresentante2').value = dato.cedulaRepre;
            document.getElementById('telefonoRepresentante2').value = dato.telefonoRepre;
            document.getElementById('direccion2').value = dato.direccion;
            document.getElementById('observacion2').value = dato.observacion;
            document.getElementById('_id').value = id;
            document.getElementById('pills-home-tab').classList.remove('active');
            console.log(dato);

            var rrr = new XMLHttpRequest();
            rrr.open("GET", `${url}/traerMaestros`, true);
            rrr.onload = function(){
                var listaMaestros = JSON.parse(this.response);
                var lista = "<option value=\"\">Seleccione</option>";
                var seleccion = "";
                for(var t = 0; t < listaMaestros.length; t++){
                    if(dato.idMaestro === listaMaestros[t]._id){
                        seleccion = "selected";
                    }
                    lista += `<option ${seleccion} value=\"${listaMaestros[t]._id}\">${listaMaestros[t].apellidos} ${listaMaestros[t].nombres}</option>`;
                    seleccion = "";
                }
                document.getElementById('selectMaestros2').innerHTML = lista;
            }
            rrr.send();
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
    var apellidos = document.getElementById('apellidos2').value;
    var nombres = document.getElementById('nombres2').value;
    var fechaNacimiento = document.getElementById('fechaNacimiento2').value;
    var apellidosRepresentante = document.getElementById('apellidosRepresentante2').value;
    var nombresRepresentante = document.getElementById('nombresRepresentante2').value;
    var cedulaRepresentante = document.getElementById('cedulaRepresentante2').value;
    var telefonoRepresentante = document.getElementById('telefonoRepresentante2').value;
    var direccion = document.getElementById('direccion2').value;
    var observacion = document.getElementById('observacion2').value;
    var _id = document.getElementById('_id').value;

    var r = new XMLHttpRequest();
    r.open("POST",`${url}/guardarEdicionAlumno/${apellidos}/${nombres}/${fechaNacimiento}/${apellidosRepresentante}/${nombresRepresentante}/${cedulaRepresentante}/${telefonoRepresentante}/${direccion}/${observacion}/${_id}`, true);
    r.onload = function(){
        alert(this.response);
        verAlumno(_id);
    }
    r.send();
}

function borrarAlumno(id){
    var confirmar = confirm('¿Está seguro(a) de querer borrar este alunno(a)?');
    if(confirmar){
        var r = new XMLHttpRequest();
        r.open("POST",`${url}/borrrarAlumno/${id}`, true);
        r.onload = function(){
            if(this.response === "1"){
                listarAlumnos();
            }
        }
        r.send();
    }
}

function guardarMaestro(){
    var apellidos = document.getElementById('apellidosMaestro').value;
    var nombres = document.getElementById('nombresMaestro').value;
    var fecha = document.getElementById('fechaNacMaestro').value;
    var cedula = document.getElementById('cedulaMaestro').value;
    var direccion = document.getElementById('direccionMaestro').value;
    var observacion = document.getElementById('observacionMaestro').value;

    var r = new XMLHttpRequest();
    r.open("POST", `${url}/guardarMaestro/${apellidos}/${nombres}/${fecha}/${cedula}/${direccion}/${observacion}`);
    r.onload = function(){
        alert(this.response);
    }
    r.send();
}

function listarMaestros(){
    var r = new XMLHttpRequest();
    r.open("GET", `${url}/listarMaestros`, true);
    r.onload = function(){
        var lista = JSON.parse(this.response);
        var filas = "";

        for(var t = 0; t < lista.length; t++){
            filas += `
                <tr>
                    <td>${lista[t].apellidos}</td>
                    <td>${lista[t].nombres}</td>
                    <td>${lista[t].fecha}</td>
                    <td>${lista[t].cedula}</td>
                    <td>${lista[t].direccion}</td>
                    <td>${lista[t].observacion}</td>
                    <td class="text-center">
                        <button data-toggle="pill" href="#pills-ver-maestros" class="btn btn-sm btn-outline-success" onclick="verMaestro('${lista[t]._id}')">Ver</button>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" onclick="borrarMaestro('${lista[t]._id}')">Borrar</button>
                    </td>
                </tr>
            `;
        }
        document.getElementById('cuerpoTablaMaestros').innerHTML = filas;
    }
    r.send();
}

function verMaestro(id){
    var r = new XMLHttpRequest();
    r.open("GET", "../VIEWS/verMaestro.html", true);
    r.onload = function(){
        document.getElementById('pills-ver-maestros').innerHTML = this.response;
        var rr = new XMLHttpRequest();
        rr.open("GET", `${url}/verMaestro/${id}`, true);
        rr.onload = function(){
            var maestro = JSON.parse(this.response);
            document.getElementById('apellidosMaestro2').value = maestro.apellidos;
            document.getElementById('nombresMaestro2').value = maestro.nombres;
            document.getElementById('fechaNacMaestro2').value = maestro.fecha;
            document.getElementById('cedulaMaestro2').value = maestro.cedula;
            document.getElementById('direccionMaestro2').value = maestro.direccion;
            document.getElementById('observacionMaestro2').value = maestro.observacion;
            document.getElementById('_id_').value = maestro._id;
            document.getElementById('pills-maestros-tab').classList.remove('active');
        }
        rr.send();
    }
    r.send();
}

function editarMaestro(){
    document.getElementById('apellidosMaestro2').removeAttribute('disabled');
    document.getElementById('nombresMaestro2').removeAttribute('disabled');
    document.getElementById('fechaNacMaestro2').removeAttribute('disabled');
    document.getElementById('cedulaMaestro2').removeAttribute('disabled');
    document.getElementById('direccionMaestro2').removeAttribute('disabled');
    document.getElementById('observacionMaestro2').removeAttribute('disabled');
    document.getElementById('btnGuardarEdicionMaestro').setAttribute('style', 'display:inline-block');
    document.getElementById('btnEditarMaestro').setAttribute('style', 'display:none');
}

function guardarEdicionMaestro(){
    var apellidos = document.getElementById('apellidosMaestro2').value;
    var nombres = document.getElementById('nombresMaestro2').value;
    var fecha = document.getElementById('fechaNacMaestro2').value;
    var cedula = document.getElementById('cedulaMaestro2').value;
    var direccion = document.getElementById('direccionMaestro2').value;
    var observacion = document.getElementById('observacionMaestro2').value;
    var _id = document.getElementById('_id_').value;

    var r = new XMLHttpRequest();
    r.open("POST", `${url}/guardarEdicionMaestro/${apellidos}/${nombres}/${fecha}/${cedula}/${direccion}/${observacion}/${_id}`, true);
    r.onload = function(){
        if(this.response === "1"){
            alert("Guardado con éxito.");
            verMaestro(_id);
        }
        else{
            alert(this.response);
        }
    }
    r.send();
}

function borrarMaestro(id){
    var confirmacion = confirm("¿Esta seguro de borrar este maestro?");
    if(confirmacion){
        var r = new XMLHttpRequest();
        r.open("POST", `${url}/borrarMaestro/${id}`, true);
        r.onload = function(){
            if(this.response === "1"){
                listarMaestros();
            }
        }
        r.send();
    }
}