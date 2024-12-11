import { ReactNode } from "react";
import Loader from "./Loader";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ErrorBox from "./ErrorBox";

interface FormProps {
  title: string;
  isLoading?: boolean;
  isSaving?: boolean;
  isError?: boolean;
  error?: any;
  children: ReactNode;
  save?: () => void;
  saveLabel?: string;
  cancel?: () => void;
  cancelLabel?: string;
}

function Form({
  title,
  isLoading,
  isSaving,
  isError,
  error,
  children,
  save,
  saveLabel,
  cancel,
  cancelLabel,
}: FormProps) {
  return (
    <Grid container>
      <Grid size={{ xs: 6 }}>
        <Card>
          <CardHeader title={title}></CardHeader>
          {isLoading && (
            <Loader message={isSaving ? "Saving data..." : undefined} />
          )}
          {isError && <ErrorBox />}
          {!isLoading && !isError && (
            <CardContent sx={{ paddingTop: 0, margin: 0 }}>
              {children}
            </CardContent>
          )}
          <CardActions>
            {save && (
              <Button onClick={save} disabled={isSaving}>
                {saveLabel ? saveLabel : "Save"}
              </Button>
            )}
            {cancel && (
              <Button onClick={cancel} color="secondary" disabled={isSaving}>
                {cancelLabel ? cancelLabel : "Cancel"}
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Form;
