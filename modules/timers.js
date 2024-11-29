// modules/timers.js
export function init() {
  const mainContent = document.getElementById('main-content');

  // Clear existing content
  mainContent.innerHTML = '';

  // Create the timers interface
  mainContent.innerHTML = `
    <div class="space-y-6 text-center">
      <h2 class="text-2xl font-bold">Timer</h2>
      <div id="timer-display" class="text-6xl font-mono">00:00:00</div>
      <div class="space-x-4">
        <button id="start-timer-btn" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Start
        </button>
        <button id="pause-timer-btn" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" disabled>
          Pause
        </button>
        <button id="reset-timer-btn" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" disabled>
          Reset
        </button>
      </div>
    </div>
  `;

  let timerInterval;
  let elapsedTime = 0;
  let isRunning = false;

  const timerDisplay = document.getElementById('timer-display');
  const startBtn = document.getElementById('start-timer-btn');
  const pauseBtn = document.getElementById('pause-timer-btn');
  const resetBtn = document.getElementById('reset-timer-btn');

  // Function to update the timer display
  const updateDisplay = () => {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
  };

  // Start timer event
  startBtn.addEventListener('click', () => {
    if (!isRunning) {
      isRunning = true;
      const startTime = Date.now() - elapsedTime;
      timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
      }, 1000);
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      resetBtn.disabled = false;
    }
  });

  // Pause timer event
  pauseBtn.addEventListener('click', () => {
    if (isRunning) {
      isRunning = false;
      clearInterval(timerInterval);
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }
  });

  // Reset timer event
  resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset the timer?')) {
      isRunning = false;
      clearInterval(timerInterval);
      elapsedTime = 0;
      updateDisplay();
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resetBtn.disabled = true;
    }
  });

  // Initialize display
  updateDisplay();
}
