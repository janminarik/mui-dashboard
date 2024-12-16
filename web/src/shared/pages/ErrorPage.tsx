import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import { TRANSLATIONS_NAMESPACES } from "../../i18n/config";

type AppError = {
  message: string;
  statusCode: number;
};

interface ErrorPageProps {
  message?: string;
  title?: string;
}

//TODO: refactoring
function ErrorPage({ message, title }: ErrorPageProps) {
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
    <Box alignItems="center" display="flex" flexDirection="column" height="100vh" justifyContent="center" p={2} width="100vw">
      <Typography color="error" gutterBottom variant="h3">
        {errorTitle}
      </Typography>
      <Typography color="textSecondary" variant="h6">
        {errorMessage}
      </Typography>
    </Box>
  );
}

export default ErrorPage;
