const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

const dbConnection = async () => {
  try {
    const uri = process.env.DATABASE_CNN;  // Asegúrate de que la variable de entorno esté correctamente cargada
    if (!uri) {
      throw new Error('MongoDB URI no definida en el archivo .env');
    }
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
};

module.exports = { dbConnection };
