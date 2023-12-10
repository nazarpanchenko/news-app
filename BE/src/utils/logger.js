const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.json(),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.Console({
      level: 'error',
      format: format.combine(format.colorize(), format.simple()),
    }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = { logger };
