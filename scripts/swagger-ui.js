import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import startServer from '../src/server.js';


(async () => {

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: [
    'docs/api/*.yml',
  ],
};
const specs = swaggerJsdoc(options);
const app = await startServer();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

})();
