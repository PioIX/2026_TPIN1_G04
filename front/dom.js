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
        return document.getElementById("contraseñaRegistro").value;
    }

    // Obtiene los datos ingresados por el usuario en la sección de LOGIN
    // Cuando el usuario toca el botón de iniciar sesión, lo compara con los usuarios de la base de datos

    getUserLogin(){
        return document.getElementById("usuarioLogin").value;
    }

    getPasswordLogin(){
        return document.getElementById("contraseñaLogin").value;
    }

    //Limpiamos lo inputs
    clearRegistroInputs() {
        document.getElementById("usuarioRegistro").value = "";
        document.getElementById("correoRegistro").value = "";
        document.getElementById("contraseñaRegistro").value = "";
    }

    clearLoginInputs() {
        document.getElementById("usuarioLogin").value = "";
        document.getElementById("contraseñaLogin").value = "";
    }
    
    //Cambio de pantalla
// Cambio de pantalla entre Login y Registro
    changeScreen() { 
        const pantallaLogin = document.getElementById("seccionInicioSesion");
        const pantallaRegistro = document.getElementById("seccionRegistro");
        
        if (pantallaLogin.style.display !== "none") {
            pantallaLogin.style.display = "none";
            pantallaRegistro.style.display = "";
        } else {
            pantallaLogin.style.display = "";
            pantallaRegistro.style.display = "none";
        }
    }

    // Inicio del juego desde la pantalla principal
    empezarJuego() {
        const pantallaPrincipal = document.getElementById("paginaPrincipal");
        const pantallaLogin = document.getElementById("seccionInicioSesion");
        const botonesBarra = document.getElementById("hrefs");
        
        // Se oculta la página principal
        pantallaPrincipal.style.display = "none";
        // Se muestra el login
        pantallaLogin.style.display = "";
        // Se muestran los botones de la barra superior
        botonesBarra.style.display = "block";
    }

    // Muestra la pantalla del juego
    mostrarJuego() {
        const juego = document.getElementById("seccionJuego");
        const botonesBarra = document.getElementById("hrefs");
        
        juego.style.display = "block"; 
        // Ocultamos los links de la barra para que no molesten durante la partida
        if (botonesBarra) botonesBarra.style.display = "none"; 
    }

    // Muestra u oculta la pantalla de administrador
    mostrarAdmin(visible) {
        const panelAdmin = document.getElementById("seccionAdmin");
        if (visible) {
            panelAdmin.style.display = "block"; 
        } else {
            panelAdmin.style.display = "none";
        }
    }
}

const ui = new UserInterface();

window.ui = ui