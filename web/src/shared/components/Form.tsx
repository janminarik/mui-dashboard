import { Button, Card, CardActions, CardContent, CardHeader } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ReactNode } from "react";

import ErrorBox from "./ErrorBox";
import Loader from "./Loader";

interface FormProps {
  cancel?: () => void;
  cancelLabel?: string;
  children: ReactNode;
  error?: any;
  isError?: boolean;
  isLoading?: boolean;
  isSaving?: boolean;
  save?: () => void;
  saveLabel?: string;
  title: string;
}

function Form({ cancel, cancelLabel, children, error, isError, isLoading, isSaving, save, saveLabel, title }: FormProps) {
  return (
    <Grid container>
      <Grid size={{ xs: 6 }}>
        <Card>
          <CardHeader title={title}></CardHeader>
          {isLoading && <Loader message={isSaving ? "Saving data..." : undefined} />}
          {isError && <ErrorBox />}
          {!isLoading && !isError && <CardContent sx={{ margin: 0, paddingTop: 0 }}>{children}</CardContent>}
          <CardActions>
            {save && (
              <Button disabled={isSaving} onClick={save}>
                {saveLabel ? saveLabel : "Save"}
              </Button>
            )}
            {cancel && (
              <Button color="secondary" disabled={isSaving} onClick={cancel}>
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
