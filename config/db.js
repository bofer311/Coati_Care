// Importar dependencias necesarias
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Inicializar la app de Express
const app = express();
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect("mongodb://localhost:27017/TurnosDraIrrazabal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el esquema y modelo de MongoDB
const turnoSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
  email: String,
  dia: String,
  hora: String,
});

const Turno = mongoose.model("Turno", turnoSchema);

// Ruta para manejar la solicitud POST y guardar el turno
app.post("/api/turnos", async (req, res) => {
  const { nombre, telefono, email, dia, hora } = req.body;

  try {
    const nuevoTurno = new Turno({
      nombre,
      telefono,
      email,
      dia,
      hora,
    });

    await nuevoTurno.save();
    res.status(201).send("Turno registrado exitosamente");
  } catch (error) {
    res.status(500).send("Error al registrar el turno");
  }
});

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => {
  console.log("Servidor iniciado en el puerto 5000");
});
