const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

class Server {
  constructor() {
    console.log("Iniciando el servidor...");
    this.app = express();
    this.port = process.env.PORT || 4000;
    this.usuarioPath = '/api/usuarios';
    this.authPath = '/api/auth'; // Ruta de autenticación
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  // Conectar a la base de datos
  async conectarDB() {
    try {
      await dbConnection();
      console.log("Conexión a la base de datos establecida.");
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
    }
  }

  // Definir las rutas
  routes() {
    this.app.use(this.usuarioPath, require("./routes/usuarios")); // Rutas de usuarios
    console.log(`Ruta de usuarios registrada en ${this.usuarioPath}`);

    this.app.use(this.authPath, require("./routes/auth")); // Rutas de autenticación
    console.log(`Ruta de autenticación registrada en ${this.authPath}`);

    this.app.get('/', (req, res) => {
      res.send('Servidor funcionando correctamente');
    });
  }

  // Configuración de middlewares
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json()); // Permite que el servidor maneje solicitudes con JSON
    this.app.use(express.static('public')); // Sirve archivos estáticos desde la carpeta 'public'
  }

  // Iniciar el servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor online en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
