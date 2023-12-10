const { newsProvider } = require('../services');

const newsController = {
  list: async (req, res, next) => {
    try {
      const newsList = await newsProvider.getList(req.query);
      res.send(newsList);
    } catch (err) {
      next(err);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const newsItem = await newsProvider.getOne(req.params.id);
      res.send(newsItem);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = { newsController };
