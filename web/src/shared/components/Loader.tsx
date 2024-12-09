import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  message: string;
}

function Loader({ message }: LoaderProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
    >
      <CircularProgress />
      <Typography variant="h5" pt={4}>
        {message}
      </Typography>
    </Box>
  );
}

export default Loader;
