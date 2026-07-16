const html = document.querySelector("html");
const btts = document.querySelectorAll(".app__card-button");
const focusBtt = document.querySelector(".app__card-button--focus");
const shortBtt = document.querySelector(".app__card-button--short");
const longBtt = document.querySelector(".app__card-button--long");
const startPauseBtt = document.querySelector(".app__card-primary-button");
const textStartPauseBtt = document.querySelector(
  ".app__card-primary-button span",
);
const bttIcon = document.querySelector(".app__card-primary-button-icon");
const timerDisplay = document.querySelector(".app__card-timer");
const resetBtt = document.querySelector(".app__card-reset-button");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const musicFocusInput = document.querySelector(".toggle-checkbox");
const music = new Audio("/sounds/luna-rise-part-one.mp3");
const endSound = new Audio("/sounds/achievement.mp3");
const startSound = new Audio("/sounds/play.wav");
const pauseSound = new Audio("/sounds/pause.mp3");

music.loop = true;
endSound.loop = true;
startSound.volume = 0.5;

let focusTime = 15;
let shortBreakTime = 300;
let longBreakTime = 900;
let timeInSeconds = focusTime;

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

startPauseBtt.addEventListener("click", toggleTimer);

resetBtt.addEventListener("click", () => {
  const currentContext = html.getAttribute("data-context");

  if (currentContext === "focus") {
    focusTime = 1500;
  } else if (currentContext === "short-break") {
    shortBreakTime = 300;
  } else if (currentContext === "long-break") {
    longBreakTime = 900;
  }

  endSound.pause();
  endSound.currentTime = 0;
  resetTimer();
  updateStartPauseButtonState();
});

musicFocusInput.addEventListener("change", () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

function changeContext(context) {
  removeHighlight();
  html.setAttribute("data-context", context);
  banner.src = `./images/${context}.png`;
  switch (context) {
    case "focus":
      timeInSeconds = focusTime;
      focusBtt.classList.add("active");
      title.innerHTML = `Optimize your productivity,<br>
                <strong class="app__title-strong">dive into what matters.</strong>`;
      break;

    case "short-break":
      timeInSeconds = shortBreakTime;
      shortBtt.classList.add("active");
      title.innerHTML = `Why don't you take a breath?<br>
                <strong class="app__title-strong">Take a short break!</strong>`;
      break;

    case "long-break":
      timeInSeconds = longBreakTime;
      longBtt.classList.add("active");
      title.innerHTML = `Time to come up for air.<br>
                <strong class="app__title-strong">Take an extended break.</strong>`;
      break;
    default:
      break;
  }
  showTimer();
  updateResetButtonVisibility();
  updateStartPauseButtonState();
}

function toggleTimer() {
  if (isRunning === true) {
    stopCountDown();
    textStartPauseBtt.innerText = "Start";
    bttIcon.src = "./images/play-arrow.png";
    pauseSound.play();
  } else {
    intervalId = setInterval(startTimer, 1000);
    startTimer();
    isRunning = true;
    textStartPauseBtt.innerText = "Pause";
    bttIcon.src = "./images/pause.png";
    startSound.play();
  }
}

function startTimer() {
  timeInSeconds -= 1;
  updateResetButtonVisibility();
  const currentContext = html.getAttribute("data-context");
  if (currentContext === "focus") {
    focusTime = timeInSeconds;
  } else if (currentContext === "short-break") {
    shortBreakTime = timeInSeconds;
  } else if (currentContext === "long-break") {
    longBreakTime = timeInSeconds;
  }

  showTimer();

  if (timeInSeconds <= 0) {
    stopCountDown();
    updateStartPauseButtonState();
    textStartPauseBtt.innerText = "Start";
    bttIcon.src = "./images/play-arrow.png";
    endSound.play();
    setTimeout(() => {
      endSound.pause();
      endSound.loop = false;
    }, 6000);

    if (currentContext === "focus") {
      const event = new CustomEvent("focusEnd");
      document.dispatchEvent(event);
    }
  }
}

function stopCountDown() {
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;
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
  stopCountDown();
  const currentContext = html.getAttribute("data-context");
  changeContext(currentContext);

  textStartPauseBtt.innerText = "Start";
  bttIcon.src = "./images/play-arrow.png";

  updateResetButtonVisibility();
}

function removeHighlight() {
  btts.forEach((btt) => {
    btt.classList.remove("active");
  });
}

function updateResetButtonVisibility() {
  const currentContext = html.getAttribute("data-context");
  if (currentContext === "focus" && timeInSeconds !== 1500) {
    resetBtt.classList.remove("hidden");
  } else if (currentContext === "short-break" && timeInSeconds !== 300) {
    resetBtt.classList.remove("hidden");
  } else if (currentContext === "long-break" && timeInSeconds !== 900) {
    resetBtt.classList.remove("hidden");
  } else {
    resetBtt.classList.add("hidden");
  }
}

updateResetButtonVisibility();

function updateStartPauseButtonState() {
  if (timeInSeconds <= 0) {
    startPauseBtt.disabled = true;
  } else {
    startPauseBtt.disabled = false;
  }
}
