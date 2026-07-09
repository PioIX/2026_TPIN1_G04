require('dotenv').config({ path: __dirname + '/.pio.env' })   
// require('dotenv').config({ path: __dirname + '/.home.env' })

var express = require('express'); //Tipo de servidor: Express
var bodyParser = require('body-parser'); //Convierte los JSON
var cors = require('cors');
const { realizarQuery } = require('./modulos/mysql');

var app = express(); //Inicializo express
var port = process.env.PORT || 4000; //Ejecuto el servidor en el puerto 4000

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//Pongo el servidor a escuchar
app.listen(port, function () {
    console.log(`Server running in http://localhost:${port}`);
});

app.get('/', function (req, res) {
    res.status(200).send({
        message: 'GET Home route working fine!'
    });
});
//  USUARIOS
//Traemos todo de los usuarios
app.get('/usuarios', async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT * FROM Usuarios`)
        res.status(200).json(respuesta)
    } catch (error) {
        console.error("Error en /usuarios:", error)
        res.status(500).json({ mensaje: "Hubo un error al obtener los usuarios" })
    }
});

//Se agrega un nuevo usuario
app.post('/usuarios', async function (req, res) {
    try {
        await realizarQuery(`INSERT INTO Usuarios (usuario, clave, email, es_admin) VALUES
            ('${req.body.usuario}', '${req.body.clave}', '${req.body.email}', '${req.body.es_admin}')`);
        res.status(201).json({ mensaje: "Usuario creado con éxito" });
    } catch (error) {
        console.error("Error en /usuarios:", error);
        res.status(500).json({ mensaje: "Hubo un error al crear el usuario" });
    }
});

//Elimina el usuario segun su id
app.delete('/usuarios', async function(req,res){
    try{
        let respuesta = await realizarQuery(`DELETE FROM Usuarios WHERE id = ${req.body.id}`)
        res.json({ message: "Usuario eliminado" })
    }catch(error){
        return ("Hubo un error")
    }
})

//Modifica datos del usuario
app.put('/usuarios', async function(req,res){
    try{
        let respuesta = await realizarQuery(`UPDATE Usuarios SET ${req.body.modificacion} = '${req.body.valor}' WHERE id = ${req.body.id}`)
        res.json({ message: "Usuario modificado" })
    }catch(error){
        return("Hubo un error")
    }
})
//PREGUNTAS
// Traemos todo de las preguntas
app.get('/preguntas', async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT * FROM Preguntas`)
        res.send(respuesta)
    } catch (error) {
        console.error("Error en /preguntas:", error)
        res.status(500).json({ mensaje: "Hubo un error al obtener las preguntas" })
    }
})

//Se agrega una nueva pregunta
app.post('/preguntas', async function (req, res) {
    try {
        await realizarQuery(`INSERT INTO Preguntas (letra, condicion, pregunta, respuesta) VALUES
            ('${req.body.letra}', '${req.body.condicion}', '${req.body.pregunta}', '${req.body.respuesta}')`);
        res.status(201).json({ mensaje: "Pregunta creada con éxito" });
    } catch (error) {
        console.error("Error en /pregunta:", error);
        res.status(500).json({ mensaje: "Hubo un error al crear la pregunta" });
    }
});

//Se elimina una pregunta
app.delete('/preguntas', async function(req,res){
    try{
        let respuesta = await realizarQuery(`DELETE FROM Preguntas WHERE id = ${req.body.id}`)
        res.json({ message: "Pregunta eliminada" })
    }catch(error){
        console.error("Error al eliminar pregunta:", error);
        res.status(500).json({ mensaje: "Hubo un error al eliminar la pregunta"});
    }
})

//Se modifica una pregunta
app.put('/preguntas', async function(req,res){
    try{
        let respuesta = await realizarQuery(`UPDATE Preguntas SET ${req.body.modificacion} = '${req.body.valor}' WHERE id = ${req.body.id}`)
        res.json({ message: "Pregunta modificado" })
    }catch(error){
        console.error("Error al modificar pregunta:", error);
        res.status(500).json({ mensaje: "Hubo un error al modificar la pregunta"});
    }
})

//PARTIDAS
app.get('/partidas', async function(req,res){
    try{
        let respuesta = await realizarQuery(`SELECT * FROM Partidas`)
        res.send(respuesta)
    }catch(error){
        console.error("Error al traer las partidas:", error);
        res.status(500).json({ mensaje: "Hubo un error al traer las partidas"});
    }
})

app.delete('/partidas', async function(req,res){
    try{
        let respuesta = await realizarQuery(`DELETE FROM Partidas WHERE id = ${req.body.id}`)
        res.json({ message: "Partida eliminada" })
    }catch(error){
        console.error("Error al eliminar la partida:", error);
        res.status(500).json({ mensaje: "Hubo un error al eliminar la partida"});
    }
})

app.post('/partidas', async function (req, res) {
    try {
        await realizarQuery(`INSERT INTO Partidas (usuario, puntos) VALUES
            ('${req.body.usuario}', '${req.body.puntos}')`);
        res.status(201).json({ mensaje: "Partida guardada con éxito" });
    } catch (error) {
        console.error("Error en /partidas:", error);
        res.status(500).json({ mensaje: "Hubo un error al guardar la partida" });
    }
});

//Se modifica una partida
app.put('/partidas', async function(req,res){
    try{
        let respuesta = await realizarQuery(`UPDATE Partidas SET ${req.body.modificacion} = '${req.body.valor}' WHERE id = ${req.body.id}`)
        res.json({ message: "Partida modificada" })
    }catch(error){
        console.error("Error al modificar partida:", error);
        res.status(500).json({ mensaje: "Hubo un error al modificar la partida"});
    }
})

