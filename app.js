
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoController = require('./controllers/todoController');
const todoModel = require('./models/todoModel');

const app = express();
const port = 3000;

app.use(express.static('public'));  // Serve static files from the 'public' directory


// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies


app.set('view engine', 'pug');
app.set('views', './views');

// Route to render the to-do list
app.get('/', (req, res) => {
    const todos = todoModel.getTodos();
    res.render('index', { todos });
});


// Routes -- restful api intergration
app.get('/todos', todoController.getTodos);
app.post('/todos', todoController.addTodo);
app.put('/todos/:id', todoController.completeTodo);
app.delete('/todos/:id', todoController.deleteTodo);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});