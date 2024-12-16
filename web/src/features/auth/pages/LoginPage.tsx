import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { AppDispatch } from "../../../app/store";
import { TRANSLATIONS_NAMESPACES } from "../../../i18n/config";
import { setIsAuth } from "../../../shared/slices/userSlice";
import { authService } from "../services/authService";

function LoginPage() {
  const { t } = useTranslation(TRANSLATIONS_NAMESPACES.AUTH);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@demo.sk");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("nbu123");
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validatePassword = () => {
    if (password.length === 0) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleLogin = () => {
    validateEmail();
    validatePassword();

    if (!emailError && !passwordError) {
      const token = authService.login(email, password);
      if (token) {
        dispatch(setIsAuth(true));
        navigate("/");
      }
    }
  };

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 8,
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          px: 4,
          py: 8,
          rowGap: 4,
          borderRadius: 3,
          width: {
            xs: "90%",
            sm: "80%",
            md: "60%",
            lg: "40%",
          },
          maxWidth: 500,
        }}
      >
        <TextField
          label={t("form.fields.email.label")}
          placeholder={email ? undefined : t("form.fields.email.placeholder")}
          required
          fullWidth
          size="small"
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          error={emailError}
          helperText={emailError && t("form.fields.email.errorMessage")}
          onBlur={validateEmail}
        />
        <TextField
          label={t("form.fields.password.label")}
          placeholder={
            password ? undefined : t("form.fields.password.placeholder")
          }
          required
          fullWidth
          type="password"
          size="small"
          value={password}
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
          error={passwordError}
          helperText={passwordError && t("form.fields.password.errorMessage")}
          onBlur={validatePassword}
        />
        <Button variant="contained" fullWidth onClick={handleLogin}>
          {t("form.buttons.login")}
        </Button>
      </Card>
    </Grid>
  );
}

export default LoginPage;
