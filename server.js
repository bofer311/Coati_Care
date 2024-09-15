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
  dia: String, // Día de la semana
  fecha: Date, // Fecha específica del turno
  hora: String, // Hora del turno
});

const Turno = mongoose.model("Turno", turnoSchema);

// Definir un esquema para la disponibilidad
const disponibilidadSchema = new mongoose.Schema({
  dia: String, // Día de la semana
  hora: String, // Hora del turno
  ocupado: Boolean, // Estado de ocupación
});

const Disponibilidad = mongoose.model("Disponibilidad", disponibilidadSchema);

// Ruta para agregar turnos a la base de datos
app.post("/api/turnos", async (req, res) => {
  try {
    const nuevoTurno = new Turno(req.body);
    await nuevoTurno.save();

    // Actualizar disponibilidad
    await Disponibilidad.findOneAndUpdate(
      { dia: req.body.dia, hora: req.body.hora },
      { ocupado: true },
      { upsert: true }
    );

    res.status(201).send("Turno registrado con éxito");
  } catch (error) {
    res.status(400).send("Error registrando el turno");
  }
});

// Ruta para obtener disponibilidad
app.get("/api/disponibilidad", async (req, res) => {
  const { dia, hora } = req.query;

  try {
    const disponibilidad = await Disponibilidad.findOne({ dia, hora });
    res.status(200).json(disponibilidad || { ocupado: false });
  } catch (error) {
    res.status(500).send("Error al obtener la disponibilidad");
  }
});

// Ruta para actualizar disponibilidad
app.post("/api/disponibilidad", async (req, res) => {
  const { dia, hora, ocupado } = req.body;

  try {
    await Disponibilidad.findOneAndUpdate(
      { dia, hora },
      { ocupado },
      { upsert: true }
    );
    res.status(200).send("Disponibilidad actualizada con éxito");
  } catch (error) {
    res.status(400).send("Error al actualizar la disponibilidad");
  }
});

// Escuchar en el puerto 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
