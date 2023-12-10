const { newsProvider } = require('./news.provider');
const { CommentItemDTO } = require('../dto');

class CommentsProvider {
  async getItemWithCommentIds(id) {
    const newsItem = await newsProvider.getOne(id);
    let commentsList = [];

    if (newsItem.kids) {
      commentsList = await Promise.all(
        newsItem.kids.map(async commentId => {
          const commentItem = await (
            await fetch(`${process.env.API_BASE_URI}/item/${commentId}.json?print=pretty`)
          ).json();
          const _kids = await this.getChildComments(commentItem.kids);
          const commentItemDTO = new CommentItemDTO({ ...commentItem, kids: _kids });

          return {
            id: commentItemDTO.id,
            text: commentItemDTO.text,
            parent: commentItemDTO.parent,
            kids: commentItemDTO.kids,
          };
        })
      );
    }

    return {
      newsItem,
      commentsList,
    };
  }

  async getChildComments(nestedCommentIds) {
    if (!Array.isArray(nestedCommentIds)) {
      return;
    }

    let kids = [...nestedCommentIds];
    if (kids) {
      kids = await Promise.all(
        nestedCommentIds.map(async kidId => {
          const nestedCommentItem = await (
            await fetch(`${process.env.API_BASE_URI}/item/${kidId}.json?print=pretty`)
          ).json();

          return {
            id: nestedCommentItem.id,
            text: nestedCommentItem.text,
            parent: nestedCommentItem.parent,
            kids: await this.getChildComments(nestedCommentItem.kids),
          };
        })
      );
    }

    return kids;
  }
}

const commentsProvider = new CommentsProvider();
module.exports = { commentsProvider };
