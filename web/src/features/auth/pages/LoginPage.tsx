import { Button, Card, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        justifyContent: "center",
        paddingTop: 8,
        width: "100vw",
      }}
    >
      <Card
        sx={{
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          maxWidth: 500,
          px: 4,
          py: 8,
          rowGap: 4,
          width: {
            lg: "40%",
            md: "60%",
            sm: "80%",
            xs: "90%",
          },
        }}
      >
        <TextField
          autoComplete="email"
          autoFocus
          error={emailError}
          fullWidth
          helperText={emailError && t("form.fields.email.errorMessage")}
          label={t("form.fields.email.label")}
          onBlur={validateEmail}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder={email ? undefined : t("form.fields.email.placeholder")}
          required
          size="small"
          type="email"
          value={email}
        />
        <TextField
          autoComplete="current-password"
          error={passwordError}
          fullWidth
          helperText={passwordError && t("form.fields.password.errorMessage")}
          label={t("form.fields.password.label")}
          onBlur={validatePassword}
          onChange={(event) => setPassword(event.target.value)}
          placeholder={
            password ? undefined : t("form.fields.password.placeholder")
          }
          required
          size="small"
          type="password"
          value={password}
        />
        <Button fullWidth onClick={handleLogin} variant="contained">
          {t("form.buttons.login")}
        </Button>
      </Card>
    </Grid>
  );
}

export default LoginPage;
