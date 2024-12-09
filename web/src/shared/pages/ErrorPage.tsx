import { useTranslation } from "react-i18next";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { TRANSLATIONS_NAMESPACES } from "../../i18n/config";

interface ErrorPageProps {
  title?: string;
  message?: string;
}

type AppError = {
  message: string;
  statusCode: number;
};

//TODO: refactoring
function ErrorPage({ title, message }: ErrorPageProps) {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.SHARED);
  const error = useRouteError();

  let errorMessage: string;
  let errorTitle: string;

  if (isRouteErrorResponse(error)) {
    errorTitle = `${error.status}`;
    errorMessage = error.statusText;
  } else if (error instanceof Error) {
    errorTitle = t("errorPage.unexpectedTitle");
    errorMessage = error.message;
  } else if (error && (error as AppError).message) {
    const appError = error as AppError;
    errorTitle = `${appError.statusCode}`;
    errorMessage = appError.message;
  } else {
    errorTitle = title ?? t("errorPage.title");
    errorMessage = message ?? t("errorPage.message");
  }

  return (
    <Box
      p={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      <Typography color="error" variant="h3" gutterBottom>
        {errorTitle}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {errorMessage}
      </Typography>
    </Box>
  );
}

export default ErrorPage;
