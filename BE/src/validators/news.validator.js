const { query, param } = require('express-validator');

const { PAGE_ITEMS_LIMIT } = require('../shared/consts.js');

const newsValidator = {
  list: [
    query('limit').isIn(Object.values(PAGE_ITEMS_LIMIT)).optional(),
    query('offset').isInt({ min: 0 }).optional(),
  ],

  getOne: [param('id').isInt({ min: 0 })],
};

module.exports = { newsValidator };
