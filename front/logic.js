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
        user_log = usuarioEncontrado.id // Se coloca su id como usuario logueado
        console.log("Sesión iniciada, id:", user_log)
        alert("¡Bienvenido, " + usuarioEncontrado.usuario + "!")
        ui.mostrarInicio()
    } else {
        alert("Usuario o contraseña incorrectos")
        return -1
    }
}


async function newUser() {
    let usuario = ui.getUserRegistro()
    let email = ui.getEmailRegistro()
    let password = ui.getPasswordRegistro()

    // Le asigna a la variable listaUsuarios todos los datos de la base de datos de usuarios
    let listaUsuarios = await llamadoAlGet()

    let mailRepetido = false;

    // Se chequea que el mail no se haya registrado
    for (let i = 0; i < listaUsuarios.length; i++) {
        if (email === listaUsuarios[i].email) { // Si está en la base de datos..
            mailRepetido = true; //Lo capta y se rompe
            break;
        }
    }

    if (mailRepetido) { // Si el maiL SÍ está repetido (si mailRepetido = true)
        ui.clearRegistroInputs()
        alert("El mail ya existe")
        return;
    } else { // Y si no está repetido, entonces...
        tomarDatos() // Se toman los datos y ocurre el pedido POST (Todo esto está en el index.js del front)
        console.log("¡Se ha registrado con éxito!")
        ui.clearRegistroInputs() // Se vacían los inputs
    }
}

function posicionarLetras() {
    const letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const total = letras.length;
    
    const cx = 250;   // mitad de 500px
    const cy = 250;
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

async function inicializarJuego() {
    ui.temporizador().iniciarTemporizador()
    let listaPreguntas = await llamadoAlGetPreguntas()

    for (let i = 0; i < listaPreguntas.length; i++) {

        document.getElementById("textoLetraActual").innerHTML = "Letra actual: " + listaPreguntas[i].letra
    }
    
    // Cuando apretás START debería ocurrir:

    // Aparece la primera pregunta
    // Se habilita el input para escribir la respuesta
    // Se habilitan los botones de ENVIAR y PASAPALABRA


}

// async function agregarLetras(){
//     let tabla = await llamadoAlGetPreguntas()
    
//     for(i= 0; i < tabla.length; i++){ //Trae las letras de la BD
//         let letras = tabla[i].letra
//     }
// }

