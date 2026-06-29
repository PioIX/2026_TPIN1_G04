// // Variable que indica si la sesión está iniciada:
// let user_log = 0


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
        ui.mostrarJuego()
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