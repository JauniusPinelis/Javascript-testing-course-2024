// src/TodoList.js
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';

function TodoList({ todos, deleteTodo }) {
    return (
        <ListGroup className="mt-3">
            {todos.map((todo, index) => (
                <ListGroup.Item key={index}>
                    {todo}
                    <Button
                        variant="danger"
                        size="sm"
                        className="float-right"
                        onClick={() => deleteTodo(index)}
                    >
                        Delete
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default TodoList;
