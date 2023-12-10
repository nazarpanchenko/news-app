const { param } = require('express-validator');

const commentsValidator = {
  getItemWithCommentIds: [param('id').isInt({ min: 1 })],
};

module.exports = { commentsValidator };
