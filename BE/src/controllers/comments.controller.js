const { ApiError } = require('../utils');
const { commentsProvider } = require('../services');

const commentsController = {
  getItemWithCommentIds: async (req, res, next) => {
    const { id } = req.params;

    try {
      const newsItem = await commentsProvider.getItemWithCommentIds(id);
      if (!newsItem) {
        next(
          ApiError.badRequest(
            `News item (ID ${id}) does not exist`
          )
        );
      }
      res.send(newsItem);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = { commentsController };
