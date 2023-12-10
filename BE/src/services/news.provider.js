const { PAGE_ITEMS_LIMIT, PAGE_ITEMS_OFFSET } = require('../shared');

class NewsProvider {
  async getList({ offset = PAGE_ITEMS_OFFSET, limit = PAGE_ITEMS_LIMIT.MAX }) {
    const listIds = await (
      await fetch(`${process.env.API_BASE_URI}/topstories.json?print=pretty`)
    ).json();
    const paginatedIds = listIds.slice(offset, limit);
    const newsList = [];

    for (const id of paginatedIds) {
      const newsItem = await this.getOne(id);
      newsList.push(newsItem);
    }

    return newsList.filter(item => item.type === 'story').sort((a, b) => a.time - b.time);
  }

  async getOne(id) {
    const newsItem = await (
      await fetch(`${process.env.API_BASE_URI}/item/${id}.json?print=pretty`)
    ).json();

    return newsItem;
  }
}

const newsProvider = new NewsProvider();
module.exports = { newsProvider };
