const { validationResult } = require('express-validator');

const { logger } = require('../utils');

const handleBadRequest =
  () =>
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const _errors = errors.array().map(err => ({ [err.param]: err.msg }));
      logger.error(`Route validation error. Errors: ${JSON.stringify(_errors)}`);

      return res.status(422).send({ errors: _errors });
    }
    next();
  };

module.exports = { handleBadRequest };
