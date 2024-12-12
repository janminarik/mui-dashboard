import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { TRANSLATIONS_NAMESPACES } from "../../i18n/config";

interface ErrorBoxProps {
  title?: string;
  message?: string;
}

function ErrorBox({ title, message }: ErrorBoxProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.SHARED);
  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography color="error" variant="h4" gutterBottom>
        {title ? title : t("errorPage.unexpectedTitle")}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {message ? message : t("errorPage.message")}
      </Typography>
    </Box>
  );
}

export default ErrorBox;
