const timerCard = document.querySelector(".app__card");

const html = document.querySelector("html");
const btts = document.querySelectorAll(".app__card-button");
const textStartPauseBtt = document.querySelector(
  ".app__card-primary-button span",
);
const bttIcon = document.querySelector(".app__card-primary-button-icon");
const timerDisplay = document.querySelector(".app__card-timer");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");

const music = new Audio("/sounds/luna-rise-part-one.mp3");
const endSound = new Audio("/sounds/achievement.mp3");
const startSound = new Audio("/sounds/play.wav");
const pauseSound = new Audio("/sounds/pause.mp3");

music.loop = true;
endSound.loop = true;
startSound.volume = 0.5;

const FOCUS_DEFAULT = 1500;
const SHORT_DEFAULT = 300;
const LONG_DEFAULT = 900;

const contextConfigs = {
  "focus": {
    defaultTimer: FOCUS_DEFAULT,
    currentTime: FOCUS_DEFAULT,
    titleText: `Optimize your productivity,<br>
    <strong class="app__title-strong">dive into what matters.</strong>`,
  },
  "short-break": {
    defaultTimer: SHORT_DEFAULT,
    currentTime: SHORT_DEFAULT,
    titleText: `Why don't you take a breath?<br>
    <strong class="app__title-strong">Take a short break!</strong>`,
  },
  "long-break": {
    defaultTimer: LONG_DEFAULT,
    currentTime: LONG_DEFAULT,
    titleText: `Time to come up for air.<br>
    <strong class="app__title-strong">Take an extended break.</strong>`,
  }
}

const timerActions = {
  "focus": handleFocus,
  "short-break": handleShortBreak,
  "long-break": handleLongBreak ,
  "toggle-timer": toggleTimer,
  "reset": handleReset,
  "toggle-music": toggleMusic,
};

let timeInSeconds = contextConfigs.focus.currentTime;
let isRunning = false;
let intervalId = null;


timerCard.addEventListener("click", (event) => {
  const timerTargetBtt = event.target.closest("[data-action]");
  if (timerTargetBtt === null) {
    return;
  }
  const action = timerTargetBtt.getAttribute("data-action");
  const execution = timerActions[action];
  if (execution) {
    execution()
  }
});

function handleFocus() {
  resetTimer();
  changeContext("focus");
};

function handleShortBreak() {
  resetTimer();
  changeContext("short-break");
};

function handleLongBreak () {
  resetTimer();
  changeContext("long-break");
};

function handleReset () {
  const currentContext = html.getAttribute("data-context");
  contextConfigs[currentContext].currentTime = contextConfigs[currentContext].defaultTimer  

  endSound.pause();
  endSound.currentTime = 0;
  resetTimer();
  updateStartPauseButtonState();
};

function toggleMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
};

function changeContext(context) {
  removeHighlight();
  html.setAttribute("data-context", context);
  banner.src = `./images/${context}.png`;
  timeInSeconds = contextConfigs[context].currentTime;
  const activeBtt = timerCard.querySelector(`[data-action="${context}"]`);
  activeBtt.classList.add("active");
  title.innerHTML = contextConfigs[context].titleText;
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
    const eventStop = new CustomEvent("timerStop");
    document.dispatchEvent(eventStop);
  } else {
    intervalId = setInterval(startTimer, 1000);
    startTimer();
    isRunning = true;
    textStartPauseBtt.innerText = "Pause";
    bttIcon.src = "./images/pause.png";
    startSound.play();
    const eventStart = new CustomEvent("timerStart");
    document.dispatchEvent(eventStart);
  }
}

function startTimer() {
  timeInSeconds -= 1;
  const timerLessenEvent = new CustomEvent("timerLessen");
  document.dispatchEvent(timerLessenEvent);
  updateResetButtonVisibility();
  const currentContext = html.getAttribute("data-context");
  contextConfigs[currentContext].currentTime = timeInSeconds;

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
    const eventStop = new CustomEvent("timerStop");
    document.dispatchEvent(eventStop);

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
  const eventStop = new CustomEvent("timerStop");
  document.dispatchEvent(eventStop);
  const timerCleanEvent = new CustomEvent("timerClean");
  document.dispatchEvent(timerCleanEvent);
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
  const resetBtt = timerCard.querySelector("[data-action=reset]");
  if (timeInSeconds !== contextConfigs[currentContext].defaultTimer ) {
    resetBtt.classList.remove("hidden");
  } else {
    resetBtt.classList.add("hidden");
  }
}

updateResetButtonVisibility();

function updateStartPauseButtonState() {
  const startPauseBtt = timerCard.querySelector("[data-action=toggle-timer]");
  if (timeInSeconds <= 0) {
    startPauseBtt.disabled = true;
  } else {
    startPauseBtt.disabled = false;
  }
}

document.addEventListener("requestTimerReset", () => {
  timerActions.handleReset();
});
