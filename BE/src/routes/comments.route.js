const express = require('express');

const { handleBadRequest } = require('../middlewares/handleBadRequest.js');
const { commentsController } = require('../controllers/comments.controller.js');
const { commentsValidator } = require('../validators/comments.validator.js');

const commentsRouter = express.Router();

commentsRouter.get(
  '/comments/:id',
  commentsValidator.getItemWithCommentIds,
  handleBadRequest(),
  commentsController.getItemWithCommentIds
);

module.exports = { commentsRouter };
