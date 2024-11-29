// modules/notes.js

export function init() {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Notes</h2>
    <textarea class="w-full h-64 p-2 bg-neutral-800 text-neutral-100 rounded-md" placeholder="Start typing your notes here..."></textarea>
  `;
  console.log("Notes tool initialized.");
}
