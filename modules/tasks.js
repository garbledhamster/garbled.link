// modules/tasks.js
export function init() {
  const mainContent = document.getElementById('main-content');

  // Clear existing content
  mainContent.innerHTML = '';

  // Create the tasks interface
  mainContent.innerHTML = `
    <div class="space-y-4">
      <h2 class="text-2xl font-bold">Tasks</h2>
      <div class="flex space-x-2">
        <input id="task-input" class="flex-1 p-2 rounded-md bg-neutral-800 text-neutral-100" placeholder="Add a new task">
        <button id="add-task-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add
        </button>
      </div>
      <ul id="tasks-list" class="space-y-2">
        <!-- Tasks will be appended here -->
      </ul>
    </div>
  `;

  // Initialize tasks array
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const tasksList = document.getElementById('tasks-list');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');

  // Function to render tasks
  const renderTasks = () => {
    tasksList.innerHTML = '';
    tasks.forEach((task, index) => {
      const taskItem = document.createElement('li');
      taskItem.className = 'flex items-center bg-neutral-800 p-4 rounded-md';
      taskItem.innerHTML = `
        <input type="checkbox" data-index="${index}" class="mr-2" ${task.completed ? 'checked' : ''}>
        <span class="flex-1 ${task.completed ? 'line-through text-gray-500' : ''}">${task.text}</span>
        <button data-index="${index}" class="delete-task-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
      `;
      tasksList.appendChild(taskItem);
    });
  };

  // Add task event
  addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskInput.value = '';
      renderTasks();
    }
  });

  // Event delegation for task interactions
  tasksList.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    if (e.target.type === 'checkbox') {
      tasks[index].completed = e.target.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    } else if (e.target.classList.contains('delete-task-btn')) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  });

  // Initial render
  renderTasks();
}
