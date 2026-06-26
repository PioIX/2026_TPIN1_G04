class UserInterface {
    constructor() {

    }
    // Obtiene los datos ingresados por el usuario en la sección de REGISTRO
    // Cuando el usuario toca el boton de registrarse, se agrega un nuevo user a la base de datos
    getUserRegistro() {
        return document.getElementById("usuarioRegistro").value;
    }

    getEmailRegistro() {
        return document.getElementById("correoRegistro").value;
    }


    getPasswordRegistro() {
        return document.getElementById("passwordRegistro").value;
    }

    // Obtiene los datos ingresados por el usuario en la sección de LOGIN
    // Cuando el usuario toca el botón de iniciar sesión, lo compara con los usuarios de la base de datos

    getUserLogin() {
        return document.getElementById("usuarioLogin").value;
    }

    getPasswordLogin() {
        return document.getElementById("passwordLogin").value;
    }

    //Limpiamos lo inputs
    clearRegistroInputs() {
        document.getElementById("usuarioRegistro").value = "";
        document.getElementById("correoRegistro").value = "";
        document.getElementById("passwordRegistro").value = "";
    }

    clearLoginInputs() {
        document.getElementById("usuarioLogin").value = "";
        document.getElementById("passwordLogin").value = "";
    }

    //Cambio de pantalla
    // Cambio de pantalla entre Login y Registro
    mostrarInicio() {
        document.getElementById("paginaPrincipal").style.display = "block";
        document.getElementById("seccionInicioSesion").style.display = "none";
        document.getElementById("seccionRegistro").style.display = "none";
        document.getElementById("seccionJuego").style.display = "none";
        document.getElementById("seccionAdmin").style.display = "none";
        document.getElementById("hrefs").style.display = "none";
    }

    mostrarRegistro() {
        document.getElementById("seccionInicioSesion").style.display = "none";
        document.getElementById("seccionRegistro").style.display = "block";
    }

    mostrarLogin() {
        const pantallaPrincipal = document.getElementById("paginaPrincipal");
        const pantallaLogin = document.getElementById("seccionInicioSesion");
        const botonesBarra = document.getElementById("hrefs");
        pantallaPrincipal.style.display = "none";
        pantallaLogin.style.display = "block";
        botonesBarra.style.display = "block";
        document.getElementById("seccionRegistro").style.display = "none";
    }


    // Muestra la pantalla del juego
    mostrarJuego() {
        document.getElementById("seccionJuego").style.display = "block";
        document.getElementById("seccionInicioSesion").style.display = "none";
        document.getElementById("hrefs").style.display = "none";
    }

    // Muestra u oculta la pantalla de administrador
    mostrarAdmin(visible) {
        const panelAdmin = document.getElementById("seccionAdmin");
        if (visible) {
            panelAdmin.style.display = "block";
            document.getElementById("seccionInicioSesion").style.display = "none";
            document.getElementById("hrefs").style.display = "none";
        } else {
            panelAdmin.style.display = "none";
        }
    }

}

const ui = new UserInterface();

window.ui = ui