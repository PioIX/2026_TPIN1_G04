async function llamadoAlGet(){
    const response = await fetch('http://localhost:4000/usuarios',{ 
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    let resultUser = await response.json()

    // Solo intenta escribir en la tabla si existe en el HTML
    let tabla = document.getElementById("tablaUsuarios")
    if(tabla){
        tabla.innerHTML = ""
        for(let i = 0; i < resultUser.length; i++){ 
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
    }

    return resultUser;
}


async function llamadoalPost(datos) {
    try{
        let response = await fetch('http://localhost:4000/usuarios',{
            method: "POST",
            headers: {
                "Content-type":"application/json",
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