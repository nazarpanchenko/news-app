import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";

import { News, NewsItem } from "./containers";
import "./App.css";

function App() {
  return (
    <Grid container fluid>
      <Router>
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/news-post/:id" element={<NewsItem />} />
        </Routes>
      </Router>
    </Grid>
  );
}

export default App;
