const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { i18next, middleware } = require('./config/lang');
const { pool } = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/error.middleware').errorHandler;


// Cargar la configuracion del entorno (.env)
dotenv.config();

// Crear la App y definir el puerto si lo provee el entorno
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Autorización de las solicitudes entre dominios
app.use(cors());

// protección contra ataques comunes
app.use(helmet());

// sistema de textos de respuesta multi-idioma
app.use(middleware.handle(i18next));

// Este middleware debe estar antes de las rutas para que pueda parsear los cuerpos de las solicitudes JSON.
app.use(express.json());

// Rutas de la aplicacion
app.use('/', routes);

// Manejador de errores 3xx 4xx 5xx etc
app.use(errorHandler);

// Iniciar la conexion con la BD e Iniciar el Servidor
pool.connect().then(() => {
  app.listen(PORT, () => {
    console.log(i18next.t('server_running', { port: PORT }));
  });
}).catch((err) => {
  console.error(i18next.t('database_connection_failed', { error: err.message }));
  process.exit(1);
});