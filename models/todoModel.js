const fs = require('fs');
const path = require('path');
const todosFilePath = path.join(__dirname, '..', 'todos.json');

// Helper function to read the todos data
const readTodosFromFile = () => {
    try {
        const data = fs.readFileSync(todosFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading todos file:', err);
        return [];
    }
};

// Helper function to write the todos data
const writeTodosToFile = (todos) => {
    try {
        fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing to todos file:', err);
    }
};

// Model functions to interact with the todos data

// Get all todos
const getTodos = () => {
    return readTodosFromFile();
};

// Add a new todo
const addTodo = (task) => {
    const todos = readTodosFromFile();
    const newTodo = { id: todos.length + 1, task, completed: false };
    todos.push(newTodo);
    writeTodosToFile(todos);
    return newTodo;
};

// Mark a todo as completed
const completeTodo = (id) => {
    const todos = readTodosFromFile();
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        writeTodosToFile(todos);
        return todo;
    }
    return null;
};

// Delete a todo
const deleteTodo = (id) => {
    let todos = readTodosFromFile();
    todos = todos.filter(todo => todo.id !== id);
    writeTodosToFile(todos);
    return todos;
};

module.exports = { getTodos, addTodo, completeTodo, deleteTodo };