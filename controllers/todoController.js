const todoModel = require('../models/todoModel');

// Get all to-dos
const getTodos = (req, res) => {
    try {
        const todos = todoModel.getTodos();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve todos' });
    }
};

// Add a new to-do

const addTodo = (req, res) => {
    const { task } = req.body;

    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }

    try {
        const newTodo = todoModel.addTodo(task);  // Add the task to the model
        res.status(201).json(newTodo);  // Return the newly added task
    } catch (err) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
};



// Mark a to-do as completed
const completeTodo = (req, res) => {
    const { id } = req.params;

    // Validate the id
    const todoId = parseInt(id);
    if (isNaN(todoId)) {
        return res.status(400).json({ error: 'Invalid todo ID' });
    }

    const updatedTodo = todoModel.completeTodo(todoId);
    if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
};

// Delete a to-do
const deleteTodo = (req, res) => {
    const { id } = req.params;

    // Validate the id
    const todoId = parseInt(id);
    if (isNaN(todoId)) {
        return res.status(400).json({ error: 'Invalid todo ID' });
    }

    const updatedTodos = todoModel.deleteTodo(todoId);
    if (!updatedTodos) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodos);
};


module.exports = { getTodos, addTodo, completeTodo, deleteTodo };
