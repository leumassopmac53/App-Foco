const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");

const focusSection = document.querySelector("#focusSection");
const taskDisplay = document.querySelector("#taskDisplay");

const timerDisplay = document.querySelector("#timer");
const statusDisplay = document.querySelector("#status");

const restartButton = document.querySelector("#restartButton");


const TASK_KEY = "foco30-task";
const END_TIME_KEY = "foco30-end-time";

const FOCUS_TIME = 30 * 60 * 1000;

let timer = null;


function saveTask(task) {
  localStorage.setItem(TASK_KEY, task);
}


function getTask() {
  return localStorage.getItem(TASK_KEY);
}


function showTask(task) {
  taskDisplay.textContent = task;

  focusSection.classList.remove("hidden");
}


function formatTime(milliseconds) {

  const seconds = Math.max(
    0,
    Math.ceil(milliseconds / 1000)
  );

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(remainingSeconds).padStart(2, "0")
  );
}


function updateTimer() {

  const endTime = Number(
    localStorage.getItem(END_TIME_KEY)
  );

  if (!endTime) {
    timerDisplay.textContent = "30:00";
    return;
  }

  const remaining = endTime - Date.now();

  if (remaining <= 0) {
    finishTimer();
    return;
  }

  timerDisplay.textContent = formatTime(remaining);
}


function startTimer() {

  clearInterval(timer);

  const endTime = Date.now() + FOCUS_TIME;

  localStorage.setItem(
    END_TIME_KEY,
    String(endTime)
  );

  statusDisplay.textContent =
    "Período de foco em andamento.";

  updateTimer();

  timer = setInterval(updateTimer, 250);
}


function finishTimer() {

  clearInterval(timer);

  timer = null;

  localStorage.removeItem(END_TIME_KEY);

  timerDisplay.textContent = "00:00";

  statusDisplay.textContent =
    "Período de foco terminou.";
}


function loadSavedTask() {

  const task = getTask();

  if (!task) {
    return;
  }

  showTask(task);

  const endTime = Number(
    localStorage.getItem(END_TIME_KEY)
  );

  if (endTime > Date.now()) {

    updateTimer();

    timer = setInterval(updateTimer, 250);

  } else {

    localStorage.removeItem(END_TIME_KEY);

    timerDisplay.textContent = "30:00";

    statusDisplay.textContent =
      "Tarefa salva. Pronto para começar um novo período.";
  }
}


taskForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const task = taskInput.value.trim();

  if (!task) {
    return;
  }

  saveTask(task);

  showTask(task);

  startTimer();

  taskInput.value = "";
});


restartButton.addEventListener("click", () => {

  const task = getTask();

  if (!task) {
    return;
  }

  showTask(task);

  startTimer();
});


loadSavedTask();

function rodaSW(){
if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker.register("./sw.js");

  });

}
}

rodaSW()