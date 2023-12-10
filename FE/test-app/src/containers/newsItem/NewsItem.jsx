import { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Paper, Box, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useComments } from "../../hooks";
import { Comments, Loader } from "../../components";

const NewsItem = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const { commentsList, getCommentsList, loading } = useComments();

  const redirectToHome = async () => {
    navigate("/");
  };

  useEffect(() => {
    getCommentsList(id);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Paper
            sx={{
              mb: 4,
            }}
          >
            <Typography variant="h5" component="h5" p={3}>
              {searchParams.get("title")}
            </Typography>
            <Box
              sx={{
                mb: 4,
                p: 3,
              }}
            >
              <ArrowBackIcon fontSize="large" onClick={redirectToHome} />
            </Box>
            <Box
              sx={{
                m: 2,
                p: 2,
              }}
            >
              <div>
                <Typography variant="p" component="p" p={1}>
                  <strong>Author</strong>: {searchParams.get("author")}
                </Typography>
              </div>
              <div>
                <Typography variant="p" component="p" p={1}>
                  <strong>Date: </strong>
                  {searchParams.get("publishment_date")}
                </Typography>
              </div>
              <div>
                <Typography variant="p" component="p" p={1}>
                  <strong>Click to read a full story: </strong>
                  <a
                    href={`${searchParams.get("url")}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {searchParams.get("url")}
                  </a>
                </Typography>
              </div>
              {!!commentsList.length && (
                <div>
                  <Box sx={{ my: 4 }}>
                    <strong>Comments</strong>
                    <em> ({searchParams.get("comments_count")})</em>
                  </Box>
                  {commentsList.map((comment) => (
                    <Box key={comment.id}>
                      <Comments comment={comment} />
                    </Box>
                  ))}
                </div>
              )}
            </Box>
          </Paper>
        </>
      )}
    </>
  );
};

export default NewsItem;
