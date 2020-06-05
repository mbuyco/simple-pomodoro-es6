const notifier = (title, options = {}) => ({
  notify(body) {
    return new Notification(title, { ...options, body });
  },
});

module.exports = notifier;
