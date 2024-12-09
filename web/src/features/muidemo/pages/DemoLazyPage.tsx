import { Box, Typography } from "@mui/material";

function DemoLazyPage() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      width="100vw"
      height="100vh"
    >
      <Typography variant="h4" textAlign="center" pt={2}>
        Demo Lazy
      </Typography>
    </Box>
  );
}

export default DemoLazyPage;
