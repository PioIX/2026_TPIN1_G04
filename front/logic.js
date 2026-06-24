import { llamadoAlGet } from "./index.js"
// Variable que indica si la sesión está iniciada:
let user_log = 0

async function login() {
    usuario = ui.getUserLogin()
    password = ui.getPasswordLogin()

    // Si el usuario NO existe y los datos están verificados que se cree la cuenta
    // ¿Cómo saber si no existe?
    // Si los datos no se repiten (elegir, por ejemplo el email y el password)
    // Verificacion de datos:
    // - Que todos los campos estén completos
    // - Que la contraseña tenga más de 8 dígitos

    for (let i = 0; i < resultUser.length; i++) {
        if (usuario != resultUser[i].usuario && password == resultUser[i].password) { // Si el email y la contraseña YA ESTÁN en la tabla...
            if (usuario == "" || password == "") {
                if (password.length > 7) {
                    return id // Verificar, no es "id" solo
                    user_log = 1
                    console.log("Sesión iniciada")
                } else {
                    alert("La contraseña debe tener más de ocho dígitos")
                }
            } else {
                alert("Debe completar todos los campos")
            }
        } else {
            return -1
        }
    }

};


// async function newUser() {
//     let usuario = ui.getUserRegistro()
//     let email = ui.getEmailRegistro()
//     let password = ui.getPasswordRegistro()

//     let listaUsuarios = await llamadoAlGet()

//     for (let i = 0; i < listaUsuarios.length; i++) {
//         if (email === listaUsuarios[i].email) {
//             ui.clearRegistroInputs()
//             return (-1) // Si el mail ya existe, devuelve -1 para indicar que no se pudo crear el usuario
//         } else if (email != listaUsuarios[i].email) {
//             ui.clearRegistroInputs()
//             tomarDatos(usuario, clave, email, es_admin)
//             console.log("¡Se ha registrado con éxito!")
//             // ¿No falta nada más?
//         }
//     }
// }

async function newUser() {
    let usuario = ui.getUserRegistro()
    let email = ui.getEmailRegistro()
    let password = ui.getPasswordRegistro()

    let listaUsuarios = await llamadoAlGet() // Esto te va a traer [] si está vacía

    // 🌟 CONTROL CLAVE: Si la tabla está vacía, registramos de una sin revisar nada
    if (listaUsuarios.length === 0) {
        ui.clearRegistroInputs()
        tomarDatos()
        console.log("¡Se ha registrado con éxito el primer usuario!")
        return; // Cortamos acá para que no entre al for
    }

    // Si la tabla NO está vacía, recién ahí corre tu bucle para revisar los mails
    let mailRepetido = false;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (email === listaUsuarios[i].email) {
            mailRepetido = true;
            break; // Si ya lo encontramos, salimos del bucle
        }
    }

    if (mailRepetido) {
        ui.clearRegistroInputs()
        console.log("El mail ya existe")
        return (-1) 
    } else {
        ui.clearRegistroInputs()
        tomarDatos()
        console.log("¡Se ha registrado con éxito!")
    }
}

window.login = login;

window.newUser = newUser

// cd back
// npm i
// npm install dotenv (si no está instalado)
// node index.js