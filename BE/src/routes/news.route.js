const express = require('express');

const { handleBadRequest } = require('../middlewares');
const { newsController } = require('../controllers');
const { newsValidator } = require('../validators');

const newsRouter = express.Router();

newsRouter.get('/news', newsValidator.list, handleBadRequest(), newsController.list);

newsRouter.get(
  '/news/:id',
  newsValidator.getOne,
  handleBadRequest(),
  newsController.getOne
);

module.exports = { newsRouter };
