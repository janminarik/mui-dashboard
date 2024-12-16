import { Box, Typography } from "@mui/material";

function DemoLazyPage() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      height="100vh"
      justifyContent="center"
      width="100vw"
    >
      <Typography pt={2} textAlign="center" variant="h4">
        Demo Lazy
      </Typography>
    </Box>
  );
}

export default DemoLazyPage;
