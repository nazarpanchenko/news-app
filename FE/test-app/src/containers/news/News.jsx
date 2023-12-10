import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Paper, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useNews } from "../../hooks";
import { Loader } from "../../components";

const News = () => {
  const { newsList, getNewsList, loading, setLoading } = useNews();

  const refreshNewsList = async () => {
    setLoading(true);
    await getNewsList();
  };

  useEffect(() => {
    getNewsList();
  }, []);

  useEffect(() => {
    const timerId = setInterval(refreshNewsList, 60000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid item container justifyContent="center" my={2} py={2} xs={12}>
            <Typography variant="h3" component="h3">
              News
            </Typography>
          </Grid>
          <Grid item container xs={12} mb={2}>
            <RefreshIcon fontSize="large" onClick={refreshNewsList} />
          </Grid>
          <Grid
            item
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="space-around"
            xs={7}
            my={2}
            py={2}
          >
            {!!newsList.length &&
              newsList.map((newsItem) => {
                // const query = {
                //   title: newsItem.title,
                //   author: newsItem.by,
                //   publishment_date: new Date(newsItem.time).toString(),
                //   comments_count: newsItem.kids.length,
                //   url: newsItem.url,
                // };

                return (
                  <Paper
                    key={newsItem.id}
                    sx={{
                      my: 4,
                      p: 2,
                    }}
                  >
                    <div>
                      <Typography variant="h5" component="h5" p={1}>
                        {newsItem.title}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="p" component="p" p={1}>
                        <strong>Author (nickname): </strong> {newsItem.by}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="p" component="p" p={1}>
                        <strong>Score: </strong>
                        {newsItem.score}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="p" component="p" p={1}>
                        <strong>Date: </strong>
                        {new Date(newsItem.time).toString()}
                      </Typography>
                    </div>
                    <div>
                      {!!newsItem.descendants && (
                        <Typography variant="p" component="p" p={1}>
                          <Link
                            to={`/news-post/${newsItem.id}?title=${
                              newsItem.title
                            }&author=${newsItem.by}&publishment_date=${new Date(
                              newsItem.time
                            ).toString()}&url=${newsItem.url}&comments_count=${
                              newsItem.kids.length
                            }`}
                          >
                            Comments: {newsItem.kids.length}
                          </Link>
                          {/* <Link
                            to={`/news-post/${newsItem.id}`}
                            params={{ ...query }}
                          >
                            Comments: {newsItem.descendants}
                          </Link> */}
                        </Typography>
                      )}
                    </div>
                  </Paper>
                );
              })}
          </Grid>
        </>
      )}
    </>
  );
};

export default News;
