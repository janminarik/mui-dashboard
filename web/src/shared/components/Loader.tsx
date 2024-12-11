import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  message?: string;
}

function Loader({ message }: LoaderProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
      <Typography variant="h6" pt={4}>
        {message ? message : "Defaul loading message"}
      </Typography>
    </Box>
  );
}

export default Loader;
