// src/TodoForm.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function TodoForm({ addTodo }) {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value) {
            addTodo(value);
            setValue('');
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Add a new todo"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
                Add Todo
            </Button>
        </Form>
    );
}

export default TodoForm;
