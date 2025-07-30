import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Portfolio API',
    version: '1.0.0',
    description: 'Professional Portfolio API Documentation'
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local server'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js', './src/docs/swagger.yaml']
};

export const swaggerSpec = swaggerJSDoc(options);
