import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Backend API',
      version: '1.0.0',
      description: 'Tài liệu Swagger cho backend Express',
    },
    servers: [
      {
        url: 'http://localhost:2024/'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {               // định nghĩa scheme
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],             // 👈 áp dụng cho toàn bộ API
      },
    ],
  },
  apis: ['src/routes/**/*.ts', 'src/controllers/**/*.ts', 'src/docs/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };
