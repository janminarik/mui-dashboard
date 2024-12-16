import { Box, Typography } from "@mui/material";

interface EmptyContentProps {
  message?: string;
  title?: string;
}

function EmptyContent({ message, title }: EmptyContentProps) {
  return (
    <Box alignItems="center" display="flex" flexDirection="column" height="100vh" justifyContent="center" p={2} textAlign="center" width="100vw">
      <Typography color="error" gutterBottom variant="h3">
        {title ?? "Empty"}
      </Typography>
      <Typography color="textSecondary" gutterBottom variant="h6">
        {message ?? "No data available."}
      </Typography>
    </Box>
  );
}

export default EmptyContent;
