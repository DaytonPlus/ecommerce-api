import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import startServer from '../src/server.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentada con Swagger',
      version: '1.0.0',
      description: 'Swagger UI con Express',
    },
    servers: [{ url: `http://localhost:8000` }],
  },
  apis: [
    'src/routes.js',
    'src/routes/*.js'
  ],
};

(async () => {
  const specs = swaggerJsdoc(options);
  const app = await startServer();
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  /*
  app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000/api-docs');
  });
  */
})();
