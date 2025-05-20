const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = 3000;
const server = http.createServer(app);

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



const io = new Server(server, {
  cors: {
    origin: '*', // Asegúrate de permitir la IP de tu frontend en producción
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Escuchar conexiones
io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado");

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado");
  });
});

// Exportar io para usarlo en rutas
module.exports.io = io;

// 🔹 Crear servidor HTTP


// 🔹 Servir archivos estáticos desde `public/`
app.use(express.static("public"));


// 🔹 Ruta básica de prueba
app.get("/", (req, res) => {
    res.send("🔥 Servidor activo y funcionando!");
});

// Rutas 

//Auth
const authRoutes = require("./routes/authRoutes.js");
app.use("/auth", authRoutes);
//Categories
const categoriesRoutes = require("./routes/categoriesRoutes.js");
app.use("/categories", categoriesRoutes);
//Food
const foodRoutes = require("./routes/foodRoutes.js");
app.use("/food", foodRoutes);
//Orders
const ordersRoutes = require("./routes/orderRoutes.js");
app.use("/orders", ordersRoutes);
//tables
const tablesRoutes = require("./routes/tableRoutes.js");
app.use("/tables", tablesRoutes);


server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
