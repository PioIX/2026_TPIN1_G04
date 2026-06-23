export async function llamadoAlGet(){
    const response = await fetch('http://localhost:4000/usuarios',{ 
        method:"GET", //GET, POST, PUT o DELETE
        headers: {
            "Content-Type": "application/json",
        },
    })
    console.log(response)//Desarma el json y lo arma como un objeto
    let resultUser = await response.json()
    console.log(resultUser)

    let tabla = document.getElementById("tablaUsuarios")
    tabla.innerHTML = "" //el innerHTML cambia el html desde el js, en este caso vacia la tabla
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

    return resultUser;
}

async function llamadoalPost(datos) {
    try{
        let response = await fetch("http://localhost:4000/usuarios",{
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

    } catch{
        console.log("ERROR")
    }
    
}

function tomarDatos() {
    let datos = { //agarra los datos ingresados
        id: getId(),
        usuario: getUsuario(),
        clave: getPassword(),
        email: getEmail(),
        es_admin: getAdmin(),
    }
    console.log(datos)
    llamadoalPost(datos)
}