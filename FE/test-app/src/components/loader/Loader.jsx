import { Grid, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Grid
      item
      container
      height="100vh"
      px="25vw"
      py="25vh"
      justifyContent="center"
      alignItems="center"
      xs={12}
    >
      <CircularProgress />
    </Grid>
  );
};

export default Loader;
