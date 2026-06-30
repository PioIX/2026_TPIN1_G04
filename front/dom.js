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
        document.getElementById("seccionJuego").style.display = "none";

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
    mostrarInicio() {
        document.getElementById("home").style.display = "block";
        document.getElementById("paginaPrincipal").style.display = "none";
        document.getElementById("seccionRegistro").style.display = "none";
        document.getElementById("seccionInicioSesion").style.display = "none";
        document.getElementById("seccionJuego").style.display = "none";
        document.getElementById("seccionAdmin").style.display = "none";
    }

    mostrarJuego() {
        document.getElementById("seccionJuego").style.display = "block";
        document.getElementById("paginaPrincipal").style.display = "none";
        document.getElementById("seccionRegistro").style.display = "none";
        document.getElementById("seccionInicioSesion").style.display = "none";
        document.getElementById("home").style.display = "none";
        document.getElementById("hrefs").style.display = "none";
        document.getElementById("seccionAdmin").style.display = "none";
        posicionarLetras()
    }


    // Muestra u oculta la pantalla de administrador
    mostrarAdmin(visible) {
        const panelAdmin = document.getElementById("seccionAdmin");
        if (visible) {
            panelAdmin.style.display = "block";
            document.getElementById("seccionInicioSesion").style.display = "none";
            document.getElementById("hrefs").style.display = "none";
            llamadoAlGet()
        } else {
            panelAdmin.style.display = "none";
        }
    }


    //Obtiene la informacion de los inputs de la seccion admin
    getUser() {
        return document.getElementById("usuarioIngresado").value
    }
    getClave() {
        return document.getElementById("claveIngresada").value
    }
    getEmail() {
        return document.getElementById("emailIngresado").value
    }
    getEsAdmin() {
        return document.getElementById("adminIngresado").value
    }

    //Obtiene la informacion del select de USUARIOS de la seccion de admin
    getSelectUser() {
        return document.getElementById("selectUser").value
    }
    //Obtiene la informacion del select de USUARIOS de modificar datos

    getModificarDatos() {
        return document.getElementById("selectModificarDatos").value
    }
    getSelectModificacion() {
        return document.getElementById("selectModificacion").value
    }
    getNuevoValor() {
        return document.getElementById("valoraModificar").value
    }
    //Obtiene la informacion de los inputs de PREGUNTAS de la seccion de admin
    getLetra() {
        return document.getElementById("letraIngresada").value
    }
    getCondicion() {
        return document.getElementById("condicionIngresada").value
    }
    getPregunta() {
        return document.getElementById("preguntaIngresada").value
    }
    getRespuesta() {
        return document.getElementById("respuestaIngresada").value
    }
    //Obtiene la informacion del select de PREGUNTAS de la seccion de admin
    getSelectPreguntas() {
        return document.getElementById("selectPreguntas").value
    }
    //Obtiene la informacion del select de PREGUNTAS de modificar datos
    getModificarDatosPreguntas() {
        return document.getElementById("selectModificarDatosPreguntas").value
    }
    getSelectModificacionPreguntas() {
        return document.getElementById("selectModificacionPreguntas").value
    }
    getNuevoValorPregunta() {
        return document.getElementById("valoraModificarPregunta").value
    }

    // Juego

    temporizador() {
    const frenar = document.getElementById("frenar");
    const pausa = document.getElementById("pausa");
    const temporizador = document.getElementById("temporizador");

    let tiempoRestante = 300;
    let intervalo;
    let pausado = false;

    function actualizarTiempo() {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        temporizador.innerHTML = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }

    function iniciarTemporizador() {
        intervalo = setInterval(() => {
            tiempoRestante--;
            actualizarTiempo();
            if (tiempoRestante === 0) {
                clearInterval(intervalo);
                alert("¡Se acabó el tiempo!");
            }
        }, 1000);
    }

    function frenarTemporizador() {
        clearInterval(intervalo);
        tiempoRestante = 300;
        pausado = false;
        pausa.textContent = "Pausa";
        actualizarTiempo();
    }

    function pausarTemporizador() {
        if (!pausado) {
            clearInterval(intervalo);
            pausado = true;
            pausa.textContent = "Reanudar";
        } else {
            iniciarTemporizador();
            pausado = false;
            pausa.textContent = "Pausa";
        }
    }

    frenar.onclick = frenarTemporizador;
    pausa.onclick = pausarTemporizador;

    return { iniciarTemporizador };
}
}

const ui = new UserInterface();

window.ui = ui