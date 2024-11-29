
// assets/modules/notes.js

/**
 * Initializes the Notes tool by rendering its UI components.
 * @param {HTMLElement} container - The main content container where the tool will be rendered.
 */
export function initTool(container) {
  container.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Notes</h2>
    <textarea id="notes-area" class="w-full h-64 p-2 bg-neutral-800 rounded-md border border-neutral-600 text-neutral-100" placeholder="Write your notes here..."></textarea>
    <div class="mt-4">
      <button id="save-notes" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save Notes</button>
      <button id="clear-notes" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Clear Notes</button>
    </div>
  `;

  // Event Listeners for Save and Clear buttons
  const saveButton = document.getElementById('save-notes');
  const clearButton = document.getElementById('clear-notes');
  const notesArea = document.getElementById('notes-area');

  // Save notes to localStorage
  saveButton.addEventListener('click', () => {
    const notes = notesArea.value;
    localStorage.setItem('userNotes', notes);
    alert('Notes saved successfully!');
  });

  // Clear notes from textarea
  clearButton.addEventListener('click', () => {
    notesArea.value = '';
  });

  // Load saved notes if available
  const savedNotes = localStorage.getItem('userNotes');
  if (savedNotes) {
    notesArea.value = savedNotes;
  }
}

// Automatically initialize the tool when the script is loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('main-content');
  initTool(container);
});
