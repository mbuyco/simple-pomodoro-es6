const countdownTimer = require('./modules/timer/countdown-timer');
const { TIMER_MODES } = countdownTimer;

const timerBgColor = {
  break: '#ff5050',
  start: '#95e895',
};

// default timer mode
let currentMode = TIMER_MODES.FLOW;

// style functions
const getBgColor = (mode) => mode === TIMER_MODES.FLOW ? timerBgColor.start : timerBgColor.break;
const setBgColor = (mode) => {
  document.body.style['background'] = getBgColor(mode);
};
const setTime = (time) => {
  document.getElementById('timer').innerText = time;
};

// timer start event binding
countdownTimer.onStart = (mode) => {
  setBgColor(mode);
};

// timer stop event binding
countdownTimer.onStop = (mode) => {
  currentMode = mode;
  document.getElementById('start').innerText = `start ${currentMode}`;
  setBgColor(currentMode);
};

// initialize start button click event
document.getElementById('start').onclick = () => {
  countdownTimer.start((time) => {
    setTime(time);
  }, currentMode);
};

// stop button click event
document.getElementById('stop').onclick = () => {
  countdownTimer.stop((time) => {
    setTime(time);
  }, TIMER_MODES.FLOW);
};

// initialize timer
document.getElementById('timer').innerHTML = countdownTimer.getStartTime();
document.getElementById('start').innerText = `start ${currentMode}`;
