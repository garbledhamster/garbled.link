// modules/notes.js
export function init() {
  const mainContent = document.getElementById('main-content');

  // Clear existing content
  mainContent.innerHTML = '';

  // Create the notes interface
  mainContent.innerHTML = `
    <div class="space-y-4">
      <h2 class="text-2xl font-bold">Notes</h2>
      <div>
        <button id="add-note-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add Note
        </button>
      </div>
      <ul id="notes-list" class="space-y-2">
        <!-- Notes will be appended here -->
      </ul>
    </div>
  `;

  // Initialize notes array
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  const notesList = document.getElementById('notes-list');
  const addNoteBtn = document.getElementById('add-note-btn');

  // Function to render notes
  const renderNotes = () => {
    notesList.innerHTML = '';
    if (notes.length === 0) {
      notesList.innerHTML = '<p class="text-gray-400">No notes available. Click "Add Note" to create one.</p>';
      return;
    }
    notes.forEach((note, index) => {
      const noteItem = document.createElement('li');
      noteItem.className = 'bg-neutral-800 p-4 rounded-md flex justify-between items-center';
      noteItem.innerHTML = `
        <span class="text-lg">${note.title || 'Untitled Note'}</span>
        <div class="space-x-2">
          <button data-index="${index}" class="edit-note-btn bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">Edit</button>
          <button data-index="${index}" class="delete-note-btn bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
        </div>
      `;
      notesList.appendChild(noteItem);
    });
  };

  // Add note event
  addNoteBtn.addEventListener('click', () => {
    const note = {
      title: '',
      content: '',
    };
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
    editNote(notes.length - 1);
  });

  // Edit note function
  const editNote = (index) => {
    const note = notes[index];
    mainContent.innerHTML = `
      <div class="space-y-4">
        <h2 class="text-2xl font-bold">Edit Note</h2>
        <input id="note-title" class="w-full p-2 rounded-md bg-neutral-800 text-neutral-100" placeholder="Title" value="${note.title}">
        <textarea id="note-content" class="w-full p-2 rounded-md bg-neutral-800 text-neutral-100 h-64" placeholder="Content">${note.content}</textarea>
        <div class="space-x-2">
          <button id="save-note-btn" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
          <button id="cancel-note-btn" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
        </div>
      </div>
    `;

    // Save note event
    document.getElementById('save-note-btn').addEventListener('click', () => {
      const updatedTitle = document.getElementById('note-title').value.trim();
      const updatedContent = document.getElementById('note-content').value.trim();
      if (updatedTitle === '' && updatedContent === '') {
        alert('Cannot save an empty note.');
        return;
      }
      note.title = updatedTitle || 'Untitled Note';
      note.content = updatedContent;
      notes[index] = note;
      localStorage.setItem('notes', JSON.stringify(notes));
      init();
    });

    // Cancel editing
    document.getElementById('cancel-note-btn').addEventListener('click', () => {
      init();
    });
  };

  // Delete note function
  const deleteNote = (index) => {
    if (confirm('Are you sure you want to delete this note?')) {
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      renderNotes();
    }
  };

  // Event delegation for edit and delete buttons
  notesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-note-btn')) {
      const index = e.target.getAttribute('data-index');
      editNote(index);
    } else if (e.target.classList.contains('delete-note-btn')) {
      const index = e.target.getAttribute('data-index');
      deleteNote(index);
    }
  });

  // Initial render
  renderNotes();
}
