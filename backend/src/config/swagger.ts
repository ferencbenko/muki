import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Muki E-Commerce API',
      version: '1.0.0',
      description: 'RESTful API for Muki web shop - product management and shopping cart',
      contact: {
        name: 'Muki Team',
        email: 'dev@muki.io',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
      {
        url: 'http://localhost:3001',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Products',
        description: 'Product management endpoints',
      },
      {
        name: 'Health',
        description: 'Health check endpoints',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Product ID',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Product name',
              example: 'Smart Lock Pro',
            },
            description: {
              type: 'string',
              nullable: true,
              description: 'Product description',
              example: 'Premium smart lock with Bluetooth connectivity',
            },
            price: {
              type: 'number',
              format: 'decimal',
              description: 'Product price',
              example: 299.0,
            },
            image_url: {
              type: 'string',
              nullable: true,
              description: 'Product image URL',
              example: 'https://example.com/image.jpg',
            },
            stock: {
              type: 'integer',
              description: 'Available stock quantity',
              example: 25,
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            error: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
        ServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error',
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
