// Import required modules
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Create an instance of Express app
const app = express();
const port = 3000; // Port on which the server will listen

// Middleware to parse JSON requests
app.use(express.json());

// In-memory database to store items
let items = [];

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Items API',
            version: '1.0.0',
            description: 'CRUD API for managing items',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./app.js'], // Path to the API routes file
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * /items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 */
app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
});

/**
 * @openapi
 * /items:
 *   get:
 *     summary: Get all items
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
app.get('/items', (req, res) => {
    res.json(items);
});

/**
 * @openapi
 * /items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the item
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    const item = items.find(item => item.id === id);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
});

/**
 * @openapi
 * /items/{id}:
 *   put:
 *     summary: Update an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: Successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 */
app.put('/items/:id', (req, res) => {
    const id = req.params.id;
    const updatedItem = req.body;
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    items[index] = updatedItem;
    res.json(updatedItem);
});

/**
 * @openapi
 * /items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the item
 *     responses:
 *       204:
 *         description: Successfully deleted
 *       404:
 *         description: Item not found
 */
app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    const index = items.findIndex(item => item.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }
    items.splice(index, 1);
    res.sendStatus(204);
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
