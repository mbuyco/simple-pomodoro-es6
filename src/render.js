const countdownTimer = require('./modules/timer/countdown-timer');
const { TIMER_MODES } = countdownTimer;

const timerBgColor = {
  break: '#f995a9',
  start: '#a1d0a1',
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
  document.getElementById('start').disabled = true;
  setBgColor(mode);
};

// timer stop event binding
countdownTimer.onStop = (mode) => {
  currentMode = mode;
  document.getElementById('start').innerText = `start ${currentMode}`;
  document.getElementById('start').disabled = false;
  document.getElementById('start').className = `button ${currentMode === TIMER_MODES.FLOW ? 'is-success' : 'is-danger'}`;
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
