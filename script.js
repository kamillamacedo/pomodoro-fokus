const html = document.querySelector('html');
const focusbtt = document.querySelector('.app__card-button--focus');
const shortbtt = document.querySelector('.app__card-button--short');
const longbtt = document.querySelector('.app__card-button--long');
const startbtt = document.querySelector('.app__card-primary-button')
const timerDisplay = document.querySelector('.app__card-timer');
const resetbtt = document.querySelector('.app__card-reset-button');

let timeInSeconds = 1500;
let isRunning = false;
let intervalId = null;


focusbtt.addEventListener('click', () =>{
    html.setAttribute('data-context', 'focus');
    timeInSeconds = 1500;
});

shortbtt.addEventListener('click', () =>{
    html.setAttribute('data-context', 'short-break');
    timeInSeconds = 300;
});

longbtt.addEventListener('click', () =>{
    html.setAttribute('data-context', 'long-break');
    timeInSeconds = 900;
});

startbtt.addEventListener('click', toggleTimer);

function toggleTimer() {
    if (isRunning === true) {
        clearInterval(intervalId);
        intervalId = null; 
        isRunning = false;
        resetbtt.classList.add('hidden');
    }else{
        intervalId = setInterval(startTimer, 1000);
        isRunning = true;
        resetbtt.classList.remove('hidden'); 
    }
    
}

function startTimer() {
    timeInSeconds -= 1;
    timerDisplay.innerText = timeInSeconds;
    
    if (timeInSeconds === 0) {
        clearInterval(intervalId);
        intervalId = null; 
        isRunning = false;
    }

}