async function llamadoAlGet() {
    //fetch de la tabla usuarios
    const response = await fetch('http://localhost:4000/usuarios', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let resultUser = await response.json()

    // Solo intenta escribir en la tabla si existe en el HTML
    let tabla = document.getElementById("tablaUsuarios")
    let select = document.getElementById("selectUser")
    let selectModificar = document.getElementById("selectModificarDatos")

    if (tabla) {
        //llena la tabla usuarios
        tabla.innerHTML = ""
        for (let i = 0; i < resultUser.length; i++) {
            tabla.innerHTML += `
                <tr>
                    <td>${resultUser[i].id}</td> 
                    <td>${resultUser[i].usuario}</td>
                    <td>${resultUser[i].clave}</td>
                    <td>${resultUser[i].email}</td>
                    <td>${resultUser[i].es_admin}</td>
                </tr>
            `
        }
        //Llena el select con el usuario
        select.innerHTML = "" //aca vacia el select para que luego se cargue con los datos de la tabla
        for (let i = 0; i < resultUser.length; i++) {//se fija las respuestas del json y las agrega al select 
            select.innerHTML += `
                <option value="${resultUser[i].id}">${resultUser[i].usuario}</option>
            `
        }
        //Llena el select con los ids
        selectModificar.innerHTML = ""
        for (let i = 0; i < resultUser.length; i++) { //misma estructura que el anterior, agrega las respuestas del pedido get y las agrega al select
            selectModificar.innerHTML += `
                <option value="${resultUser[i].id}">${resultUser[i].usuario}</option>
            `
        }

    }


    return resultUser;
}


async function llamadoalPost(datos) {
    try {
        let response = await fetch('http://localhost:4000/usuarios', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(datos) // usa los datos de la funcion "tomarDatos" y los manda al back
        })
        console.log(response)
        let result = await response.json()
        console.log(result)
        llamadoAlGet()
    } catch (error) {
        console.log("ERROR")
    }

}

function tomarDatos() {
    let datos = {
        usuario: ui.getUserRegistro(),
        clave: ui.getPasswordRegistro(),
        email: ui.getEmailRegistro(),
        es_admin: 0,
    }
    console.log(datos)
    llamadoalPost(datos)
}
//USUARIOS ADMIN
//agregar usuario
function agregarUsuario() {
    let datos = {
        usuario: ui.getUser(),
        clave: ui.getClave(),
        email: ui.getEmail(),
        es_admin: ui.getEsAdmin()
    }
    console.log(datos)
    llamadoalPost(datos)
}
//Elimnar usuario
async function eliminarUsuario() {
    let dato = ui.getSelectUser() //agarra el dato del select
    try {
        let response = await fetch("http://localhost:4000/usuarios", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: dato }) //convierte los datos en json y los manda al back
        })
        let result = await response.json()
        console.log(result)
        llamadoAlGet()

    } catch (error) {
        return ("Hubo un error")
    }
}
//Modificar datos
async function modificarUsuario() {
    let datos = { // obtiene los datos de los inputs y selects
        id: ui.getModificarDatos(),
        modificacion: ui.getSelectModificacion(),
        valor: ui.getNuevoValor()
    }
    try {
        let response = await fetch("http://localhost:4000/usuarios", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos) //convierte los datos obtenidos en json y los manda al back
        })
        let result = await response.json()
        console.log(result)
        llamadoAlGet()
    } catch (error) {
        return ("Hubo un error")
    }
}
//PREGUNTAS ADMIN
async function llamadoAlGetPreguntas(datos) {
    //fetch de la tabla preguntas
    const respuesta = await fetch('http://localhost:4000/preguntas', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let resultPregunta = await respuesta.json()
    let tablaPreguntas = document.getElementById("tablaPreguntas")
    let select = document.getElementById("selectPregunta")
    let selectModificarPreguntas = document.getElementById("selectModificarDatosPreguntas")
    //llena la tabla preguntas
    if (tablaPreguntas) {
        tablaPreguntas.innerHTML = ""
        for (let i = 0; i < resultPregunta.length; i++) {
            tablaPreguntas.innerHTML += `
                <tr>
                    <td>${resultPregunta[i].id}</td> 
                    <td>${resultPregunta[i].letra}</td>
                    <td>${resultPregunta[i].condicion}</td>
                    <td>${resultPregunta[i].pregunta}</td>
                    <td>${resultPregunta[i].respuesta}</td>
                </tr>
            `
        }
        //Llena el select con las preguntas
        select.innerHTML = ""
        for (let i = 0; i < resultPregunta.length; i++) {
            select.innerHTML += `
                <option value="${resultPregunta[i].id}">${resultPregunta[i].pregunta}</option>
            `
        }
        //Llena el select con los ids
        selectModificarPreguntas.innerHTML = ""
        for (let i = 0; i < resultPregunta.length; i++) {
            selectModificarPreguntas.innerHTML += `
                <option value="${resultPregunta[i].id}">${resultPregunta[i].pregunta}</option>
            `
        }

    }

    return resultPregunta
}

async function llamadoalPostPreguntas(datos) {
    try {
        let response = await fetch('http://localhost:4000/preguntas', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(datos)
        })
        console.log(response)
        let result = await response.json()
        console.log(result)
        llamadoAlGetPreguntas()
    } catch (error) {
        console.log("ERROR")
    }

}
//agregar pregunta
function agregarPregunta() {
    let datos = {
        letra: ui.getLetra(),
        condicion: ui.getCondicion(),
        pregunta: ui.getPregunta(),
        respuesta: ui.getRespuesta()
    }
    console.log(datos)
    llamadoalPostPreguntas(datos)
}

//eliminar pregunta
async function eliminarPregunta() {
    let dato = ui.getSelectPregunta() //agarra el dato del select
    try {
        let response = await fetch("http://localhost:4000/pregunta", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: dato }) //convierte los datos en json y los manda al back
        })
        let result = await response.json()
        console.log(result)
        llamadoAlGetPreguntas()
    } catch (error) {
        return ("Hubo un error")
    }
}

//modificar pregunta
async function modificarPregunta() {
    let datos = { // obtiene los datos de los inputs y selects
        id: ui.getModificarDatosPreguntas(),
        modificacion: ui.getSelectModificacionPreguntas(),
        valor: ui.getNuevoValorPregunta()
    }
    try {
        let response = await fetch("http://localhost:4000/preguntas", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos) //convierte los datos obtenidos en json y los manda al back
        })
        let result = await response.json()
        console.log(result)
        llamadoAlGetPreguntas()
    } catch (error) {
        return ("Hubo un error")
    }
}

//PARTIDAS ADMIN
async function llamadoAlGetPartidas() {
    const respuesta = await fetch('http://localhost:4000/partidas',{
        method:"GET",
        headers: { "Content-Type": "application/json" },
    })
    let resultPartidas = await respuesta.json()
    let listaUsuarios = await llamadoAlGet()

    let tablaPartidas = document.getElementById("tablaPartidas")
    let selectPartidas = document.getElementById("selectPartida")

    if(tablaPartidas){
        tablaPartidas.innerHTML = ""
        for(let i = 0; i < resultPartidas.length; i++){
            let nombreUsuario = resultPartidas[i].usuario // si no se encuentra, muestra el id
            for(let k = 0; k < listaUsuarios.length; k++){
                if(listaUsuarios[k].id == resultPartidas[i].usuario){
                    nombreUsuario = listaUsuarios[k].usuario
                    break;
                }
            }
            tablaPartidas.innerHTML += `
                <tr>
                    <td>${resultPartidas[i].id}</td> 
                    <td>${nombreUsuario}</td>
                    <td>${resultPartidas[i].puntos}</td>
                </tr>
            `
        }

        if(selectPartidas){
            selectPartidas.innerHTML = ""
            for(let i = 0; i < resultPartidas.length; i++){
                let nombreUsuario = resultPartidas[i].usuario
                for(let j = 0; j < listaUsuarios.length; j++){
                    if(listaUsuarios[j].id == resultPartidas[i].usuario){
                        nombreUsuario = listaUsuarios[j].usuario
                        break;
                    }
                }
                selectPartidas.innerHTML += `
                    <option value="${resultPartidas[i].id}">${nombreUsuario}</option>
                `
            }
        }
    }
}

async function eliminarPartidas() {
    let dato = ui.getSelectPartidas() //agarra el dato del select
    try {
        let response = await fetch("http://localhost:4000/partidas", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: dato }) //convierte los datos en json y los manda al back
        })
        let result = await response.json()
        console.log(result)
        llamadoAlGetPartidas()
    } catch (error) {
        return ("Hubo un error")
    }
}


async function modificarPartidas() {
    let datos = { // obtiene los datos de los inputs y selects
        id: ui.getModificarDatosPartidas(),
        modificacion: ui.getSelectModificacionPartidas(),
        valor: ui.getNuevoValorPartidas()
    }
    try {
        let response = await fetch("http://localhost:4000/partidas", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos)
        })
        let result = await response.json()
        console.log(result)
        llamadoAlGetPartidas()
    } catch (error) {
        return ("Hubo un error")
    }
}

//  JUEGO
async function llamadoalPostPartidas(datos) {
    try {
        let response = await fetch('http://localhost:4000/partidas', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(datos)
        })
        let result = await response.json()
        console.log(result)
    } catch (error) {
        console.log("ERROR al guardar la partida", error)
    }
}


async function llenarTablaHome() {
    const respuesta = await fetch('http://localhost:4000/partidas', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    let resultPartidas = await respuesta.json();
    let listaUsuarios = await llamadoAlGet(); //trae los usuarios para que aparezcan en el ranking
    let tabla = document.getElementById("tablaPartidasHome");
    if (tabla == null) {
        return; //si la tabla no tiene nada no se ejecuta lo de abajo
    }
    // Ordena el array de mayor a menor puntaje
    
    for (let i = 0; i < resultPartidas.length; i++) {
        for (let j = 0; j < resultPartidas.length - 1; j++) {
            if (resultPartidas[j].puntos < resultPartidas[j + 1].puntos) {
                let temporal = resultPartidas[j];
                resultPartidas[j] = resultPartidas[j + 1];
                resultPartidas[j + 1] = temporal;
            }
        }
    }

    tabla.innerHTML = "";
    let limite = Math.min(5, resultPartidas.length);
    for (let i = 0; i < limite; i++) {
        let nombreUsuario = resultPartidas[i].usuario; // si no encuentra el nombre muestra el id
        for (let k = 0; k < listaUsuarios.length; k++) { //se fija en la lista de usuarios
            if (listaUsuarios[k].id == resultPartidas[i].usuario) {
                nombreUsuario = listaUsuarios[k].usuario; //cambia el id por el user una vez que lo encontró
                break;
            }
        }
        tabla.innerHTML += `
        <tr>
            <td>${nombreUsuario}</td>
            <td>${resultPartidas[i].puntos}</td>
        </tr>`;
    }
}