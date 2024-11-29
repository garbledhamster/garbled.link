
// assets/modules/tasks.js

/**
 * Initializes the Tasks tool by rendering its UI components.
 * @param {HTMLElement} container - The main content container where the tool will be rendered.
 */
export function initTool(container) {
  container.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Tasks</h2>
    <div class="flex mb-4">
      <input type="text" id="task-input" class="w-full p-2 bg-neutral-800 rounded-md border border-neutral-600 text-neutral-100" placeholder="Enter a new task">
      <button id="add-task" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Add</button>
    </div>
    <ul id="task-list" class="list-disc pl-6">
      <!-- Tasks will be appended here -->
    </ul>
  `;

  // Event Listeners for Add button
  const addButton = document.getElementById('add-task');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load saved tasks from localStorage
  const savedTasks = JSON.parse(localStorage.getItem('userTasks')) || [];
  savedTasks.forEach(task => addTaskToList(task));

  // Add Task Function
  const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    addTaskToList(taskText);
    savedTasks.push(taskText);
    localStorage.setItem('userTasks', JSON.stringify(savedTasks));
    taskInput.value = '';
  };

  // Function to create and append a task to the list
  const addTaskToList = (taskText) => {
    const li = document.createElement('li');
    li.className = 'flex items-center space-x-2';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-checkbox h-5 w-5 text-blue-600';

    const span = document.createElement('span');
    span.textContent = taskText;

    // Remove task on double-click
    li.addEventListener('dblclick', () => {
      taskList.removeChild(li);
      const index = savedTasks.indexOf(taskText);
      if (index > -1) savedTasks.splice(index, 1);
      localStorage.setItem('userTasks', JSON.stringify(savedTasks));
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    taskList.appendChild(li);
  };

  // Add task on button click
  addButton.addEventListener('click', addTask);

  // Add task on Enter key press
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });
}

// Automatically initialize the tool when the script is loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('main-content');
  initTool(container);
});
