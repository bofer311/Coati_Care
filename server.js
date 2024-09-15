const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// Crear una aplicación Express
const app = express();
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes (body-parser)
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

// Definir un esquema para los turnos
const turnoSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  email: String,
  dia: String,
  hora: String,
});

// Crear un modelo basado en el esquema
const Turno = mongoose.model("Turno", turnoSchema);

// Ruta para agregar turnos a la base de datos
app.post("/api/turnos", async (req, res) => {
  try {
    const nuevoTurno = new Turno(req.body);
    await nuevoTurno.save();
    res.status(201).send("Turno registrado con éxito");
  } catch (error) {
    res.status(400).send("Error registrando el turno");
  }
});

// Ruta para obtener los turnos ocupados
app.get("/api/turnos", async (req, res) => {
  try {
    const turnos = await Turno.find();
    res.status(200).json(turnos);
  } catch (error) {
    res.status(500).send("Error al obtener los turnos");
  }
});

// Escuchar en el puerto 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
