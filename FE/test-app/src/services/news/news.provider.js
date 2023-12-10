class NewsProvider {
  req_uri;

  constructor(req_uri) {
    this.req_uri = req_uri;
  }

  async getNewsList() {
    const newsList = await (await fetch(`${this.req_uri}`)).json();
    return newsList;
  }

  async getOne(id) {
    const newsItem = await (await fetch(`${this.req_uri}/${id}`)).json();
    return newsItem;
  }
}

export default NewsProvider;
