require('dotenv').config({ path: __dirname + '/.home.env' })


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

// Traemos todo de las preguntas

app.get('/preguntas', async function (req, res) {
    try {
        let respuesta = await realizarQuery(`SELECT * FROM Preguntas`)
        res.send(respuesta)
    } catch (error) {
        console.error("Error en /usuarios:", error)
        res.status(500).json({ mensaje: "Hubo un error al obtener los usuarios" })
    }
})

app.post('/usuarios', async function (req, res) {
    try {
        const { usuario, clave, email, es_admin } = req.body;

        let query = `INSERT INTO Usuarios (usuario, clave, email, es_admin) VALUES (?, ?, ?, ?)`;
        await realizarQuery(query, [usuario, clave, email, es_admin]);

        res.status(201).json({ mensaje: "Usuario creado con éxito en la BD" });
    } catch (error) {
        console.error("Error en /usuarios:", error);
        // Sin esto el front recibe HTML de error
        res.status(500).json({ mensaje: "Hubo un error al crear el usuario" });
    }
});

