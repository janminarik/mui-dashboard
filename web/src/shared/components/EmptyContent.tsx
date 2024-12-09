import { Box, Typography } from "@mui/material";

interface EmptyContentProps {
  title?: string;
  message?: string;
}

function EmptyContent({ title, message }: EmptyContentProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
      textAlign="center"
      p={2}
    >
      <Typography variant="h3" color="error" gutterBottom>
        {title ?? "Empty"}
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {message ?? "No data available."}
      </Typography>
    </Box>
  );
}

export default EmptyContent;
