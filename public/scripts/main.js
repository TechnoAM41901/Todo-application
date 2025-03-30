document.addEventListener('DOMContentLoaded', function () {
    // Event listener for the "Add Task" button
    document.getElementById('add-task-btn').addEventListener('click', function (e) {
        e.preventDefault();  // Prevent form submission

        const taskInput = document.getElementById('task-input');
        const task = taskInput.value.trim();  // Get task value from input field

        if (!task) {
            alert("Please enter a task!");
            return;
        }

        // Send POST request to add the new task
        fetch('http://localhost:3000/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: task })  // Send the task as JSON
        })
        .then(response => response.json())
        .then(data => {
            console.log('Task added:', data);

            // Clear the input field
            taskInput.value = '';

            // Add the new task to the task list (dynamically)
            const todoList = document.getElementById('todo-list');
            const newTodoItem = document.createElement('li');
            newTodoItem.textContent = data.task;  // Assuming the response includes the 'task' field
            todoList.appendChild(newTodoItem);
        })
        .catch(error => {
            console.error('Error adding task:', error);
        });
    });
});
