function formatMessage(level, message, metadata) {
  const base = {
    level,
    message,
    timestamp: new Date().toISOString(),
  };

  return JSON.stringify(metadata ? { ...base, metadata } : base);
}

const logger = {
  info(message, metadata) {
    console.log(formatMessage('info', message, metadata));
  },
  warn(message, metadata) {
    console.warn(formatMessage('warn', message, metadata));
  },
  error(message, metadata) {
    console.error(formatMessage('error', message, metadata));
  },
};

module.exports = { logger };
