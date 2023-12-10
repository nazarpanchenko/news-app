import { useState } from "react";

import { VITE_API_BASE_URI } from "../shared";
import { CommentsProvider } from "../services";

const useComments = () => {
  const NEWS_BASE_URI = `${VITE_API_BASE_URI}/comments`;
  const commentsProvider = new CommentsProvider(NEWS_BASE_URI);

  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCommentsList = async (id) => {
    try {
      const fetchedData = await commentsProvider.getCommentsList(id);
      setCommentsList(fetchedData.commentsList);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return { commentsList, getCommentsList, loading };
};

export default useComments;
