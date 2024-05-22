// src/App.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="8">
          <Card>
            <Card.Body>
              <Card.Title>Todo List</Card.Title>
              <TodoForm addTodo={addTodo} />
              <TodoList todos={todos} deleteTodo={deleteTodo} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
