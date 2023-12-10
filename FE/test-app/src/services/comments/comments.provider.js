class CommentsProvider {
  req_uri;

  constructor(req_uri) {
    this.req_uri = req_uri;
  }

  async getCommentsList(id) {
    const commentsList = await (
      await fetch(`${this.req_uri}/${id}`)
    ).json();
    return commentsList;
  }
}

export default CommentsProvider;
