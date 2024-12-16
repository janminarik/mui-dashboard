import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { TRANSLATIONS_NAMESPACES } from "../../i18n/config";

interface ErrorBoxProps {
  message?: string;
  title?: string;
}

function ErrorBox({ message, title }: ErrorBoxProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.SHARED);
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      p={2}
    >
      <Typography color="error" gutterBottom variant="h4">
        {title ? title : t("errorPage.unexpectedTitle")}
      </Typography>
      <Typography color="textSecondary" variant="h6">
        {message ? message : t("errorPage.message")}
      </Typography>
    </Box>
  );
}

export default ErrorBox;
