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

    clearJuegoInput() {
        document.getElementById("inputRespuesta").value = "";
    }
    //Cambio de pantalla
    // Cambio de pantalla entre Login y Registro
    mostrarInicio() {
        document.getElementById("paginaPrincipal").style.display = "flex";
        document.getElementById("seccionInicioSesion").style.display = "none";
        document.getElementById("home").style.display = "none";
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
        botonesBarra.style.display = "flex";
        document.getElementById("seccionRegistro").style.display = "none";
        document.getElementById("home").style.display = "none";
        document.getElementById("seccionJuego").style.display = "none";
        document.getElementById("seccionAdmin").style.display = "none";
    }

    // Muestra la pantalla del juego
    mostrarHome() {
        document.getElementById("home").style.display = "flex";
        document.getElementById("hrefs").style.display = "none";
        document.getElementById("paginaPrincipal").style.display = "none";
        document.getElementById("seccionRegistro").style.display = "none";
        document.getElementById("seccionInicioSesion").style.display = "none";
        document.getElementById("seccionJuego").style.display = "none";
        document.getElementById("seccionAdmin").style.display = "none";
        llenarTablaHome();
    }

    mostrarJuego() {
        document.getElementById("seccionJuego").style.display = "flex";
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

    //Obtiene la informacion del select de PARTIDAS de la seccion de admin
    getSelectPartidas() {
        return document.getElementById("selectPartida").value
    }
    //Obtiene la informacion del select de PARTIDAS de modificar datos
    selectModificarDatosPartidas() {
        return document.getElementById("selectModificarDatosPartidas").value
    }
    selectModificacionPartidas() {
        return document.getElementById("selectModificacionPartidas").value
    }
    getNuevoValorPartida() {
        return document.getElementById("valoraModificarPartidas").value
    }

    // Juego

    temporizador() {
        const frenar = document.getElementById("frenar");
        const pausa = document.getElementById("pausa");
        const temporizador = document.getElementById("temporizador");

        let tiempoRestante = 210;
        let intervalo;
        let pausado = false;

        function actualizarTiempo() {
            const minutos = Math.floor(tiempoRestante / 60);
            const segundos = tiempoRestante % 60;
            temporizador.innerHTML = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
        }

        function iniciarTemporizador() {
            intervalo = setInterval(async () => {
                tiempoRestante--;
                actualizarTiempo();
                if (tiempoRestante === 0) {
                    clearInterval(intervalo);
                    let mensajeStats = `¡Se acabó el tiempo! Aquí están tus resultados:\n\n` +
                        ` Respuestas correctas: ${puntosPartida}\n` +
                        ` Respuestas incorrectas: ${erroresPartida}`;

                    ui.showModal("¡Fin de la Partida!", mensajeStats);
                    await guardarPartida()
                    ui.mostrarHome();
                }
            }, 1000);
        }

        function frenarTemporizador() {
            clearInterval(intervalo);
            tiempoRestante = 210;
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
            return pausado; // avisa al que llamó si quedó pausado (true) o reanudado (false)
        }

        return { iniciarTemporizador, frenarTemporizador, pausarTemporizador };

    }

    getInputRespuesta() {
        return document.getElementById("inputRespuesta").value
    }

    // showModal()
    // textoBoton y accion son opcionales: si no se pasan, el botón dice "¡Listo!" y solo cierra el modal.
    // Si se pasa una accion, esta se ejecuta al tocar el botón (además de cerrar el modal).
    showModal(titulo, texto, textoBoton = "¡Listo!", accion = null) {
        document.getElementById("modalTitle").textContent = titulo;
        document.getElementById("modalBody").textContent = texto;

        const modal = document.getElementById("modal");
        const boton = document.getElementById("modalBoton");

        boton.textContent = textoBoton;
        boton.onclick = function () {
            modal.classList.remove("show");
            if (accion) accion();
        };

        modal.classList.add("show");
    }

    hideModal() {
        document.getElementById("modal").classList.remove("show");
    }

    modalGame(textoBoton, instrucciones, funcionEmpezar) {
        // 1. Inyectamos las instrucciones y el texto del botón en el HTML
        document.getElementById("modalGameInstructions").textContent = instrucciones;

        const botonEmpezar = document.getElementById("btnEmpezarJuegoJuego");
        botonEmpezar.textContent = textoBoton;

        // 2. Mostramos el modal agregando la clase 'show'
        const modal = document.getElementById("modalGame");
        modal.classList.add("show");

        // 3. Cuando hagan clic en el botón, se cierra el modal y arranca el juego
        botonEmpezar.onclick = () => {
            modal.classList.remove("show"); // Oculta el modal
            funcionEmpezar(); // Llama a inicializarJuego()
        };

    }

    showConfirmModal(titulo, texto, funcionConfirmar) {
        document.getElementById("modalConfirmarTitle").textContent = titulo;
        document.getElementById("modalConfirmarBody").textContent = texto;

        const modal = document.getElementById("modalConfirmar");
        const btnSi = document.getElementById("btnConfirmarSi");
        const btnNo = document.getElementById("btnConfirmarNo");

        modal.classList.add("show");

        // Si confirma, se cierra el modal y se ejecuta la acción (finalizar sin guardar)
        btnSi.onclick = function () {
            modal.classList.remove("show");
            funcionConfirmar();
        };

        // Si no confirma, simplemente se cierra el modal y el juego continúa
        btnNo.onclick = function () {
            modal.classList.remove("show");
        };
    }

    hideConfirmModal() {
        document.getElementById("modalConfirmar").classList.remove("show");
    }

    // Toast de notificación (arriba a la derecha, solo se descarta, no requiere aceptar nada)
    showToast() {
        document.getElementById("toastTeclado").classList.add("show");
    }

    hideToast() {
        document.getElementById("toastTeclado").classList.remove("show");
    }
};

const ui = new UserInterface();

window.ui = ui