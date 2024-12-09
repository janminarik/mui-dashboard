import { Box, Typography } from "@mui/material";

interface ErrorDisplayProps {
  message: string;
}

function ErrorDisplay({ message }: ErrorDisplayProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 2,
        border: "1px solid",
        borderColor: "error.main",
        borderRadius: 2,
        backgroundColor: "error.light",
      }}
    >
      <Typography variant="h6" color="error">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        {message}
      </Typography>
    </Box>
  );
}

export default ErrorDisplay;
