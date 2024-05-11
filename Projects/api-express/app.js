// Import required modules
const express = require('express');

// Create an instance of Express app
const app = express();
const port = 3000; // Port on which the server will listen

// In-memory database to store items
let items = [{ "id": 1 }];

// Route to create a new item (CREATE operation)
app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
});

// Route to get all items (READ operation)
app.get('/items', (req, res) => {
    res.json(items);
});

// Route to get a single item by ID (READ operation)
app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    const item = items.find(item => item.id === id);
    if (!item) {
        return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
});

// Route to update an existing item by ID (UPDATE operation)
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

// Route to delete an item by ID (DELETE operation)
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
