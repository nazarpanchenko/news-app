class CommentItemDTO {
  text;
  parent;

  constructor(commentItem) {
    this.id = commentItem.id;
    this.text = commentItem.text;
    this.parent = commentItem.parent;
    this.kids = commentItem.kids || [];
  }
}

module.exports = { CommentItemDTO };
