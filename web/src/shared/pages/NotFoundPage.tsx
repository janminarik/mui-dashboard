import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import { TRANSLATIONS_NAMESPACES } from "../../i18n/config";

function NotFoundPage() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.SHARED);
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

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
        {t("notFoundPage.title")}
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        {t("notFoundPage.message")}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        {t("notFoundPage.button")}
      </Button>
    </Box>
  );
}

export default NotFoundPage;
