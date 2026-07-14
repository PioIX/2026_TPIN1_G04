// Variable que indica si la sesión está iniciada:
let user_log = 0

//     // Si el usuario NO existe y los datos están verificados que se cree la cuenta
//     // ¿Cómo saber si no existe?
//     // Si los datos no se repiten (elegir, por ejemplo el email y el password)
//     // Verificacion de datos:
//     // - Que todos los campos estén completos
//     // - Que la contraseña tenga más de 8 dígitos


async function login() {
    let usuario = ui.getUserLogin()
    let password = ui.getPasswordLogin()

    // Verifica que todos los campos estén completos
    if (usuario === "" || password === "") {
        alert("Debe completar todos los campos")
        return
    }

    // Verifica si el usuario que inició sesión es el admin
    if (usuario === "admin" && password === "banana4") {
        ui.mostrarAdmin(true); // Si el usuario es el admin cambia a la pantalla de admin
        return;
    }

    // Se asignan los datos del get de usuarios a una variable
    let listaUsuarios = await llamadoAlGet()

    let usuarioEncontrado

    // Verifica que el usuario esté registrado
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (usuario === listaUsuarios[i].usuario && password === listaUsuarios[i].clave) {
            usuarioEncontrado = listaUsuarios[i]
            break;
        }
    }
    if (usuarioEncontrado) {
        ui.showModal("¡Bienvenido, " + usuarioEncontrado.usuario + "!", "¡Disfruta del juego!")
        user_log = usuarioEncontrado.id // Se coloca su id como usuario logueado
        console.log("Sesión iniciada, id:", user_log)
        ui.mostrarHome()
        ui.clearLoginInputs()

    } else {
        alert("Usuario o contraseña incorrectos")
        return -1
    }
}


async function newUser() {
    let usuario = ui.getUserRegistro()
    let email = ui.getEmailRegistro()
    let password = ui.getPasswordRegistro()

    // Verifica que todos los campos estén completos
    if (usuario === "" || email === "" || password === "") {
        alert("Debe completar todos los campos")
        return;
    }

    // Verifica que el correo tenga un @
    if (!email.includes("@")) {
        alert("El correo electrónico debe contener un @")
        return;
    }

    // Verifica que la contraseña tenga 8 caracteres o más
    if (password.length < 8) {
        alert("La contraseña debe tener 8 caracteres o más")
        return;
    }

    // Le asigna a la variable listaUsuarios todos los datos de la base de datos de usuarios
    let listaUsuarios = await llamadoAlGet()

    let usuarioRepetido = false;
    let mailRepetido = false;

    // Se chequea que el usuario y el mail no se hayan registrado ya
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (usuario === listaUsuarios[i].usuario) {
            usuarioRepetido = true;
        }
        if (email === listaUsuarios[i].email) {
            mailRepetido = true;
        }
    }

    if (usuarioRepetido) { // Si el usuario ya existe
        alert("Ese nombre de usuario ya existe")
        return;
    }

    if (mailRepetido) { // Si el mail ya existe
        alert("El mail ya existe")
        return;
    }

    // Si pasó todas las validaciones, se registra
    await tomarDatos() // Se toman los datos y ocurre el pedido POST (Todo esto está en el index.js del front)
    console.log("¡Se ha registrado con éxito!")
    ui.clearRegistroInputs() // Se vacían los inputs
    ui.mostrarHome() // Recién ahora pasamos a Home, porque el registro fue exitoso
    ui.showModal("¡Bienvenido por primera vez, " + usuario + "!", "¡Disfrutá del juego!")
}

// Método para formar un ROSCO con las letras
function posicionarLetras() {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const total = letras.length;

    const cx = 225;   // mitad de 450px, que es el tamaño real de #letras (antes decía 250, de un 500px viejo)
    const cy = 225;
    const radio = 200;

    letras.forEach((letra, i) => {
        const angulo = (2 * Math.PI * i / total) - Math.PI / 2;
        const x = cx + radio * Math.cos(angulo);
        const y = cy + radio * Math.sin(angulo);

        const span = document.getElementById(`letra-${letra}`);
        span.style.position = "absolute";
        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        span.style.transform = "translate(-50%, -50%)";
    });
}

let indicePregunta = 0;
let listaPreguntas = [];
let puntosPartida = 0;
let erroresPartida = 0;
let temporizadorInstance = null; // guarda la instancia actual del temporizador para poder controlarla desde otras funciones

// Método para armar las preguntas según su letra
function armarPreguntasJuego(preguntas) {
    const ordenLetras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let preguntasOrdenadas = []; // Esta variable va a ser un array que contenga todas las preguntas seleccionadas que se van a mostrar en el rosco después de filtrarlas
    ordenLetras.forEach(letra => {
        // El método ".filter()" devuelve un array nuevo (a partir de otro, con condiciones)
        // Acá según la lista de preguntas, se filtran las preguntas que coincidan con la letra actual (la letra de la tabla con la letra actual del rosco)
        let coincidencias = preguntas.filter(p => p.letra.toUpperCase() === letra);
        if (coincidencias.length > 0) {
            // Se elige un elemento random de ese nuevo array creado (si hay 5 elementos en la tabla con la letra A, se elige uno para mostrar)
            let indiceRandom = Math.floor(Math.random() * coincidencias.length);
            preguntasOrdenadas.push(coincidencias[indiceRandom]);
        }
        // Si no hay ninguna pregunta para esa letra, simplemente se la salta
    });

    return preguntasOrdenadas;
}

async function inicializarJuego() {
    ui.showToast();
    temporizadorInstance = ui.temporizador();
    temporizadorInstance.iniciarTemporizador();
    let respuestaBD = await llamadoAlGetPreguntas()
    listaPreguntas = respuestaBD.data || respuestaBD || [];

    preguntasArmadas = armarPreguntasJuego(listaPreguntas);
    indicePregunta = 0;

    if (preguntasArmadas.length > 0) {
        actualizarPreguntas();
    }
}

function actualizarPreguntas() {
    let preguntaActual = preguntasArmadas[indicePregunta];
    document.getElementById("textoLetraActual").innerHTML = preguntaActual.letra;
    document.getElementById("textoCondicion").innerHTML = preguntaActual.condicion;
    document.getElementById("textoPregunta").innerHTML = preguntaActual.pregunta;
}

function enviarRespuesta() {
    let preguntaActual = preguntasArmadas[indicePregunta];
    let letraActual = preguntaActual.letra.toUpperCase();

    let respuestaUsuario = ui.getInputRespuesta().trim().toLowerCase();
    let respuestaCorrecta = preguntaActual.respuesta.trim().toLowerCase();

    if (respuestaUsuario === respuestaCorrecta) {
        document.getElementById(`letra-${letraActual}`).style.backgroundColor = "green";
        ui.clearJuegoInput()
        puntosPartida++;
    } else {
        document.getElementById(`letra-${letraActual}`).style.backgroundColor = "red";
        document.getElementById("respuestaCorrectaJuego").innerHTML = "La respuesta correcta era: " + respuestaCorrecta
        erroresPartida++
    }

    indicePregunta++;
    if (indicePregunta < preguntasArmadas.length) {
        actualizarPreguntas();
        const input = document.getElementById('inputRespuesta');
        input.value = '';
        input.focus();
    } else {
        let mensajeStats = `¡Completaste el rosco! Aquí están tus resultados:\n\n` +
            ` Respuestas correctas: ${puntosPartida}\n` +
            ` Respuestas incorrectas: ${erroresPartida}`;

        ui.showModal("¡Fin de la Partida!", mensajeStats);
        guardarPartida();
        ui.mostrarHome();
    }

}

function pasapalabra() {
    if (listaPreguntas.length <= 1) return; // si queda una sola, no tiene sentido pasarla

    let preguntaActual = preguntasArmadas[indicePregunta];
    let letraActual = preguntaActual.letra.toUpperCase();

    document.getElementById(`letra-${letraActual}`).style.backgroundColor = "yellow";

    // Sacamos la pregunta actual de su posición...
    preguntasArmadas.splice(indicePregunta, 1);
    // ...y la mandamos al final del array, para volver a esta después
    preguntasArmadas.push(preguntaActual);

    if (indicePregunta >= listaPreguntas.length) indicePregunta = 0;

    actualizarPreguntas();
}

function finalizarJuego() {
    // Muestra el modal con dos opciones: confirmar o cancelar.
    ui.showConfirmModal(
        "¡Atención!",
        "¿Realmente finalizarás la partida? Ten en cuenta que el progreso de este juego no se guardará.",
        confirmarFinalizarJuego  // Le pasamos el NOMBRE de la función que se debe ejecutar si el usuario confirma.

    );
    // Si el usuario elige "No, gracias", showConfirmModal simplemente cierra el modal
    // y el juego continúa exactamente donde estaba (acá no pasa nada más).
}

// Se ejecuta SOLO si el usuario toca "Sí, finalizar" en el modal
function confirmarFinalizarJuego() {
    if (temporizadorInstance) {
        temporizadorInstance.frenarTemporizador(); // corta el timer sin guardar ni reiniciar la partida
    }
    ui.mostrarHome(); // vuelve a Home sin guardar la partida
}

function pausarJuego() {
    if (!temporizadorInstance) return;

    const quedoPausado = temporizadorInstance.pausarTemporizador(); // true = se pausó, false = se reanudó

    if (quedoPausado) {
        // Un solo modal: el mismo botón "Reanudar" cierra el modal Y reanuda el juego
        ui.showModal(
            "Juego pausado",
            "Tocá 'Reanudar' cuando quieras seguir jugando.",
            "Reanudar",
            reanudarJuego
        );
    }
    // Si el usuario reanuda tocando directamente el botón "Pausa" (ahora "Reanudar")
    // de la pantalla del juego, no hace falta mostrar ningún modal.
}

// Se ejecuta al tocar "Reanudar" dentro del modal
function reanudarJuego() {
    if (temporizadorInstance) {
        temporizadorInstance.pausarTemporizador();
    }
}

function reiniciarJuego() {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    for (let i = 0; i < letras.length; i++) {
        let span = document.getElementById(`letra-${letras[i]}`);
        if (span != null) {
            span.style.backgroundColor = "";
        }
    }

    indicePregunta = 0;
    puntosPartida = 0;

    document.getElementById("respuestaCorrectaJuego").innerHTML = "";
    ui.clearJuegoInput();

    if (listaPreguntas.length > 0) {
        actualizarPreguntas();
        const input = document.getElementById('inputRespuesta');
        input.value = '';
        input.focus();
    }
    inicializarJuego();
}

async function guardarPartida() {
    let datos = {
        usuario: user_log,
        puntos: puntosPartida
    }

    let guardadoExitoso = await llamadoalPostPartidas(datos);
    if (guardadoExitoso) {
        await llenarTablaHome();
    }

    puntosPartida = 0; // resetea los puntos para la próxima partida
}

document.getElementById('inputRespuesta').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        enviarRespuesta(); // Llama a la función de arriba
    }
});

document.getElementById('inputRespuesta').addEventListener('keydown', function (event) {
    if (event.key === ' ') { // Si se toca la tecla Espacio...
        event.preventDefault();
        pasapalabra();
    }
});
//Registro
document.getElementById("usuarioRegistro").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("correoRegistro").focus(); //Cuando presiona enter al poner el usuario pasa al correo
    }
});
document.getElementById("correoRegistro").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("passwordRegistro").focus(); // del correo pasa a la contraseña
    }
});
document.getElementById('passwordRegistro').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        newUser(); // Llama a la función de arriba
    }
});
//Login 
document.getElementById("usuarioLogin").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("passwordLogin").focus();
    }
});
document.getElementById("passwordLogin").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        login();
    }
});