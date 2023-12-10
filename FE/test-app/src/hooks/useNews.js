import { useState } from "react";

import { VITE_API_BASE_URI } from "../shared";
import { NewsProvider } from "../services";

const useNews = () => {
  const NEWS_BASE_URI = `${VITE_API_BASE_URI}/news`;
  const newsProvider = new NewsProvider(NEWS_BASE_URI);

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNewsList = async () => {
    try {
      const _newsList = await newsProvider.getNewsList();
      setNewsList(_newsList);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return { newsList, getNewsList, loading, setLoading };
};

export default useNews;
