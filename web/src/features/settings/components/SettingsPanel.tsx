import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import { Theme } from "@mui/material/styles";

import { AppDispatch, RootState } from "../../../app/store";
import Sidebar, {
  SidebarProps,
} from "../../../shared/components/Layout/Sidebar";
import { closeSettingsPanel } from "../slices/settingsPanelSlice";
import { setLanguage, setTheme } from "../slices/uiSettingsSlice";
import { TRANSLATIONS_NAMESPACES } from "../../../i18n/config";
import { Language, ThemeName } from "../../../shared/types/commonTypes";

const StyledSettingsPanel = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: theme.spacing(2, 2),
  width: theme.custom.settingsPanelWidth,
}));

function SettingsPanel(props: SidebarProps) {
  const { t, i18n } = useTranslation(TRANSLATIONS_NAMESPACES.SETTNGS);
  const open = useSelector((state: RootState) => state.settingsPanel.open);
  const theme = useSelector((state: RootState) => state.uiSettings.theme);
  const language = useSelector((state: RootState) => state.uiSettings.language);

  const dispatch = useDispatch<AppDispatch>();

  const handleSelectedThemeChange = (event: SelectChangeEvent<ThemeName>) => {
    dispatch(setTheme(event.target.value as ThemeName));
  };

  const handleLanguageChange = (event: SelectChangeEvent<Language | null>) => {
    if (event.target.value === null) return;
    const lang = event.target.value as Language;
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  const handleClose = () => {
    dispatch(closeSettingsPanel());
  };

  return (
    <Sidebar
      anchor="right"
      mode="temporary"
      open={open}
      onClose={handleClose}
      {...props}
      content={
        <StyledSettingsPanel>
          <Stack spacing={2} mt={2}>
            <FormControl fullWidth size="small" variant="outlined">
              <TextField
                label={t("settings.theme.label")}
                value={theme}
                select
                size="small"
                onChange={(event) => handleSelectedThemeChange(event)}
              >
                {Object.values(ThemeName).map((item) => (
                  <MenuItem key={item} value={item}>
                    {t(`settings.theme.options.${item}`)}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <FormControl fullWidth size="small" variant="outlined">
              <TextField
                select
                size="small"
                label={t("settings.language.label")}
                value={language}
                onChange={(event) => handleLanguageChange(event)}
              >
                {Object.values(Language).map((lang) => (
                  <MenuItem key={lang} value={lang}>
                    {t(`settings.language.options.${lang}`)}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Stack>
        </StyledSettingsPanel>
      }
    ></Sidebar>
  );
}

export default SettingsPanel;
