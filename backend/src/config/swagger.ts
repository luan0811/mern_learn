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
        url: 'http://localhost:2024/' // Sửa từ api thành url
      },
    ],
  },
  apis: ['src/routes/**/*.ts', 'src/controllers/**/*.ts', 'src/docs/**/*.ts'], // Nếu chạy file .js, sửa thành dist/**/*.js
};
export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };