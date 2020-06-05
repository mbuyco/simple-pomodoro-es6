const moment = require('moment');

const DEFAULT_FLOW_DURATION_MINUTES = 0.03;
const DEFAULT_BREAK_DURATION_MINUTES = 0.03;
const TIMER_MODES = {
  BREAK: 'break',
  FLOW: 'flow',
};

const defaultTimerValue = moment('00:00', 'mm:ss');
const flowTimerStart = moment(defaultTimerValue).add(DEFAULT_FLOW_DURATION_MINUTES, 'minutes');
const breakTimerStart = moment(defaultTimerValue).add(DEFAULT_BREAK_DURATION_MINUTES, 'minutes');

let countdownTime = moment(flowTimerStart);
let timerId;

const countdownTimer = {
  getCurrentTime() {
    return this.getFormattedTime(countdownTime);
  },

  getFormattedTime(time, format = 'mm:ss') {
    return moment(time, 'mm:ss').format(format)
  },

  getStartTime(mode = TIMER_MODES.FLOW) {
    return this.getFormattedTime(mode === TIMER_MODES.FLOW ? flowTimerStart : breakTimerStart);
  },

  onStart() {},
  onStop() {},

  resetTimer(mode = TIMER_MODES.FLOW) {
    countdownTime = moment((mode === TIMER_MODES.FLOW) ? flowTimerStart : breakTimerStart);
  },

  start(callback, mode = TIMER_MODES.FLOW, interval = 1) {
    console.log(mode);
    this.onStart(mode);
    this.tick(callback, mode, interval);
  },

  stop(callback, mode = TIMER_MODES.FLOW) {
    this.onStop(mode);
    this.resetTimer(mode);
    callback(this.getStartTime(mode));
    clearTimeout(timerId);
  },

  tick(callback, mode, interval) {
    callback(this.getFormattedTime(countdownTime), mode);

    timerId = setTimeout(() => {
      const timeDiffInSeconds = countdownTime.diff(defaultTimerValue, 'seconds');

      if (timeDiffInSeconds === 0) {
        this.stop(callback, mode === TIMER_MODES.FLOW ? TIMER_MODES.BREAK : TIMER_MODES.FLOW);
        return;
      }

      countdownTime = countdownTime.subtract(1, 'seconds');
      this.tick(callback, mode, interval);
    }, interval * 1000);
  },

  TIMER_MODES,
};

module.exports = countdownTimer;
