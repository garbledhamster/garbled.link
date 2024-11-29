
// assets/modules/timers.js

/**
 * Initializes the Timers tool by rendering its UI components.
 * @param {HTMLElement} container - The main content container where the tool will be rendered.
 */
export function initTool(container) {
  container.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">Timers</h2>
    <div class="mb-4">
      <input type="number" id="timer-input" class="w-full p-2 bg-neutral-800 rounded-md border border-neutral-600 text-neutral-100" placeholder="Enter time in seconds">
    </div>
    <button id="start-timer" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Start Timer</button>
    <div id="timer-display" class="mt-4 text-4xl font-bold text-center"></div>
  `;

  // DOM Elements
  const startButton = document.getElementById('start-timer');
  const timerInput = document.getElementById('timer-input');
  const timerDisplay = document.getElementById('timer-display');

  let countdown; // To store the interval ID

  // Start Timer Function
  const startTimer = () => {
    const seconds = parseInt(timerInput.value, 10);
    if (isNaN(seconds) || seconds <= 0) {
      alert('Please enter a valid number of seconds.');
      return;
    }

    // Clear any existing timer
    clearInterval(countdown);

    let remaining = seconds;
    timerDisplay.textContent = formatTime(remaining);

    countdown = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(countdown);
        timerDisplay.textContent = "Time's up!";
        alert("Timer completed!");
      } else {
        timerDisplay.textContent = formatTime(remaining);
      }
    }, 1000);
  };

  // Format time as MM:SS
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  // Pad single digits with leading zero
  const pad = (num) => {
    return num.toString().padStart(2, '0');
  };

  // Event Listeners
  startButton.addEventListener('click', startTimer);
  timerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      startTimer();
    }
  });
}

// Automatically initialize the tool when the script is loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('main-content');
  initTool(container);
});
