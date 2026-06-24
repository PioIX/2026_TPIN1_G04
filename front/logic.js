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
        ui.clearRegistroInputs() // Se vacían los inputs
        tomarDatos() // Se toman los datos y ocurre el pedido POST (Todo esto está en el index.js del front)
        console.log("¡Se ha registrado con éxito!")
    }
}