const html = document.querySelector("html");
const btts = document.querySelectorAll(".app__card-button");
const focusbtt = document.querySelector(".app__card-button--focus");
const shortbtt = document.querySelector(".app__card-button--short");
const longbtt = document.querySelector(".app__card-button--long");
const startbtt = document.querySelector(".app__card-primary-button");
const timerDisplay = document.querySelector(".app__card-timer");
const resetbtt = document.querySelector(".app__card-reset-button");

let timeInSeconds = 1500;
let isRunning = false;
let intervalId = null;

focusbtt.addEventListener("click", () => {
  html.setAttribute("data-context", "focus");
  timeInSeconds = 1500;
  showTimer();
  removeHighlight();
  focusbtt.classList.add("active");
});

shortbtt.addEventListener("click", () => {
  html.setAttribute("data-context", "short-break");
  timeInSeconds = 300;
  showTimer();
  removeHighlight();
  shortbtt.classList.add("active");
});

longbtt.addEventListener("click", () => {
  html.setAttribute("data-context", "long-break");
  timeInSeconds = 900;
  showTimer();
  removeHighlight();
  longbtt.classList.add("active");
});

startbtt.addEventListener("click", toggleTimer);

resetbtt.addEventListener("click", resetTimer);

function toggleTimer() {
  if (isRunning === true) {
    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
    resetbtt.classList.add("hidden");
  } else {
    intervalId = setInterval(startTimer, 1000);
    isRunning = true;
    resetbtt.classList.remove("hidden");
  }
}

function startTimer() {
  timeInSeconds -= 1;
  showTimer();

  if (timeInSeconds === 0) {
    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
  }
}

function showTimer() {
  const minutos = Math.floor(timeInSeconds / 60);
  const segundos = timeInSeconds % 60;
  const minutosFormatados = String(minutos).padStart(2, "0");
  const segundosFormatados = String(segundos).padStart(2, "0");
  timerDisplay.innerText = `${minutosFormatados}:${segundosFormatados}`;
}

showTimer();

function resetTimer() {
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
  if (html.getAttribute("data-context") === "focus") {
    timeInSeconds = 1500;
  } else if (html.getAttribute("data-context") === "short-break") {
    timeInSeconds = 300;
  } else if (html.getAttribute("data-context") === "long-break"){
    timeInSeconds = 900;
  }

  showTimer()
  resetbtt.classList.add("hidden");
}

function removeHighlight() {
    btts.forEach(btt=> {
        btt.classList.remove("active")
    });
}