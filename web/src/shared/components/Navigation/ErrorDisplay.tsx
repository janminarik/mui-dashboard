import { Box, Typography } from "@mui/material";

interface ErrorDisplayProps {
  message: string;
}

function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "error.light",
        border: "1px solid",
        borderColor: "error.main",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 2,
        textAlign: "center",
      }}
    >
      <Typography color="error" variant="h6">
        Oops! Something went wrong.
      </Typography>
      <Typography sx={{ marginTop: 1 }} variant="body2">
        {message}
      </Typography>
    </Box>
  );
}

export default ErrorDisplay;
