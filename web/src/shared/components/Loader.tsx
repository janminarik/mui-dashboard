import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  message?: string;
}

function Loader({ message }: LoaderProps) {
  return (
    <Box alignItems="center" display="flex" flexDirection="column" justifyContent="center">
      <CircularProgress />
      <Typography pt={4} variant="h6">
        {message ? message : "Defaul loading message"}
      </Typography>
    </Box>
  );
}

export default Loader;
