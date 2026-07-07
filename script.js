const html = document.querySelector("html");
const btts = document.querySelectorAll(".app__card-button");
const focusBtt = document.querySelector(".app__card-button--focus");
const shortBtt = document.querySelector(".app__card-button--short");
const longBtt = document.querySelector(".app__card-button--long");
const startBtt = document.querySelector(".app__card-primary-button");
const textStartBtt = document.querySelector(".app__card-primary-button span");
const bttIcon = document.querySelector(".app__card-primary-button-icon");
const timerDisplay = document.querySelector(".app__card-timer");
const resetBtt = document.querySelector(".app__card-reset-button");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");

let timeInSeconds = 1500;
let isRunning = false;
let intervalId = null;

focusBtt.addEventListener("click", () => {
  resetTimer();
  changeContext("focus");
});

shortBtt.addEventListener("click", () => {
  resetTimer();
  changeContext("short-break");
});

longBtt.addEventListener("click", () => {
  resetTimer();
  changeContext("long-break");
});

startBtt.addEventListener("click", toggleTimer);

resetBtt.addEventListener("click", resetTimer);

function changeContext(context) {
  removeHighlight();
  html.setAttribute("data-context", context);
  banner.src = `./images/${context}.png`;
  switch (context) {
    case "focus":
      timeInSeconds = 1500;
      focusBtt.classList.add("active");
      title.innerHTML = `Optimize your productivity,<br>
                <strong class="app__title-strong">dive into what matters.</strong>`;
      break;

    case "short-break":
      timeInSeconds = 300;
      shortBtt.classList.add("active");
      title.innerHTML = `Why don't you take a breath?<br>
                <strong class="app__title-strong">Take a short break!</strong>`;
      break;

    case "long-break":
      timeInSeconds = 900;
      longBtt.classList.add("active");
      title.innerHTML = `Time to come up for air.<br>
                <strong class="app__title-strong">Take an extended break.</strong>`;
      break;
    default:
      break;
  }
  showTimer();
}

function toggleTimer() {
  resetBtt.classList.remove("hidden");
  if (isRunning === true) {
    clearInterval(intervalId);
    intervalId = null;
    isRunning = false;
    textStartBtt.innerText = "Start";
    bttIcon.src = "./images/play-arrow.png";
  } else {
    intervalId = setInterval(startTimer, 1000);
    isRunning = true;
    textStartBtt.innerText = "Pause";
    bttIcon.src = "./images/pause.png";
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
  const currentContext = html.getAttribute("data-context");
  changeContext(currentContext);

  resetBtt.classList.add("hidden");
  textStartBtt.innerText = "Start";
  bttIcon.src = "./images/play-arrow.png";
}

function removeHighlight() {
  btts.forEach((btt) => {
    btt.classList.remove("active");
  });
}
