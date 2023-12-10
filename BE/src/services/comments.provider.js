const { newsProvider } = require('./news.provider');
const { CommentItemDTO } = require('../dto');

class CommentsProvider {
  async getItemWithCommentIds(id) {
    const newsItem = await newsProvider.getOne(id);
    let commentsList = [];

    if (newsItem.descendants) {
      commentsList = await Promise.all(
        newsItem.kids.map(async commentId => {
          const commentItem = await (
            await fetch(`${process.env.API_BASE_URI}/item/${commentId}.json?print=pretty`)
          ).json();
          const commentItemDTO = new CommentItemDTO(commentItem);

          return {
            id: commentItemDTO.id,
            text: commentItemDTO.text,
            parent: commentItemDTO.parent,
            kids: await this.getChildComments(commentItemDTO.kids),
          };
        })
      );
    }

    return {
      newsItem,
      commentsList,
    };
  }

  async getChildComments(commentsList) {
    let kids = [];
    while (commentsList.kids) {
      kids = await Promise.all(
        commentsList.map(async comment => {
          return {
            id: comment.id,
            text: comment.text,
            parent: comment.parent,
            kids: await this.getChildComments(commentsList.kids),
          };
        })
      );
    }
    return kids;
  }
}

const commentsProvider = new CommentsProvider();
module.exports = { commentsProvider };
