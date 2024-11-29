// modules/notes.js

/**
 * Initializes the Notes tool by rendering its UI components.
 * @param {HTMLElement} container - The main content container where the tool will be rendered.
 */
export function initTool(container) {
  // Check if Firebase Auth is available
  if (!window.auth) {
    container.innerHTML = `
      <div class="bg-red-600 text-white p-4 rounded-md">
        <strong>Error:</strong> Firebase Authentication is not initialized. Please ensure you are logged in.
      </div>
    `;
    return;
  }

  // Reference to the auth instance
  const auth = window.auth;

  // Function to render the Notes UI
  const renderNotesUI = (user) => {
    // Unique key for storing notes per user
    const storageKey = `notes_${user.uid}`;

    // Retrieve notes from localStorage
    const savedNotes = JSON.parse(localStorage.getItem(storageKey)) || [];

    // HTML structure for Notes tool
    container.innerHTML = `
      <h2 class="text-2xl font-bold mb-4">Notes</h2>
      <div class="mb-4 flex">
        <input type="text" id="new-note-input" class="flex-1 p-2 bg-neutral-800 rounded-l-md border border-neutral-600 text-neutral-100" placeholder="Enter a new note">
        <button id="add-note-button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md">Add Note</button>
      </div>
      <ul id="notes-list" class="space-y-2">
        ${savedNotes.map((note, index) => `
          <li class="flex justify-between items-center bg-neutral-800 p-2 rounded-md">
            <span>${escapeHTML(note)}</span>
            <button data-index="${index}" class="remove-note-button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Remove</button>
          </li>
        `).join('')}
      </ul>
    `;

    // DOM Elements
    const addNoteButton = document.getElementById('add-note-button');
    const newNoteInput = document.getElementById('new-note-input');
    const notesList = document.getElementById('notes-list');

    // Function to escape HTML to prevent XSS
    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, (tag) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag]));
    }

    // Function to save notes to localStorage
    const saveNotes = (notes) => {
      localStorage.setItem(storageKey, JSON.stringify(notes));
    };

    // Function to add a new note
    const addNote = () => {
      const noteText = newNoteInput.value.trim();
      if (noteText === '') {
        alert('Please enter a note.');
        return;
      }

      // Retrieve current notes
      const currentNotes = JSON.parse(localStorage.getItem(storageKey)) || [];
      currentNotes.push(noteText);
      saveNotes(currentNotes);

      // Append the new note to the UI
      const newNoteElement = document.createElement('li');
      newNoteElement.className = 'flex justify-between items-center bg-neutral-800 p-2 rounded-md';
      newNoteElement.innerHTML = `
        <span>${escapeHTML(noteText)}</span>
        <button data-index="${currentNotes.length - 1}" class="remove-note-button bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Remove</button>
      `;
      notesList.appendChild(newNoteElement);

      // Clear the input field
      newNoteInput.value = '';
    };

    // Function to remove a note
    const removeNote = (index) => {
      // Retrieve current notes
      let currentNotes = JSON.parse(localStorage.getItem(storageKey)) || [];
      if (index < 0 || index >= currentNotes.length) return;

      // Remove the note from the array
      currentNotes.splice(index, 1);
      saveNotes(currentNotes);

      // Re-render the notes list
      renderNotesUI(user);
    };

    // Event Listener for Add Note button
    addNoteButton.addEventListener('click', addNote);

    // Event Listener for Enter key on input field
    newNoteInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addNote();
      }
    });

    // Event Delegation for Remove Note buttons
    notesList.addEventListener('click', (e) => {
      if (e.target && e.target.matches('button.remove-note-button')) {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        if (!isNaN(index)) {
          removeNote(index);
        }
      }
    });
  };

  // Function to render access denied message
  const renderAccessDenied = () => {
    container.innerHTML = `
      <div class="bg-red-600 text-white p-4 rounded-md">
        <strong>Access Denied:</strong> Please log in to access your notes.
      </div>
    `;
  };

  // Initial Render based on Authentication State
  const initialUser = auth.currentUser;
  if (initialUser) {
    renderNotesUI(initialUser);
  } else {
    renderAccessDenied();
  }

  // Listen for Authentication State Changes
  auth.onAuthStateChanged((user) => {
    if (user) {
      renderNotesUI(user);
    } else {
      renderAccessDenied();
    }
  });
}

/**
 * Automatically initialize the tool when the script is loaded.
 * Ensures that the tool is initialized only when its script is loaded dynamically.
 */
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('main-content');
  if (container) {
    initTool(container);
  }
});
