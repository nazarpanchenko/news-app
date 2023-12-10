const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const { newsRouter, commentsRouter } = require('./routes');
const { logger } = require('./utils');
const { API_PREFIX } = require('./shared');

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'));

app.use(API_PREFIX, newsRouter);
app.use(API_PREFIX, commentsRouter);

process.on('uncaughtException', err => {
  logger.error(`uncaughtException: ${err}'`);
  throw new Error(err);
});

process.on('unhandledRejection', err => {
  logger.error(`unhandledRejection: ${err}'`);
  throw new Error(err);
});

const startServer = () => {
  const PORT = process.env.PORT || 9000;

  try {
    app.listen(PORT, async () => {
      logger.info(`Server is listening on the port ${PORT}`);
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { startServer };
