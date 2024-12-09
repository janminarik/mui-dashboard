import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";
import { Theme } from "@mui/material/styles";

import { AppDispatch, RootState } from "../../../app/store";
import Sidebar, {
  SidebarProps,
} from "../../../shared/components/Layout/Sidebar";
import { Language } from "../../../shared/types/Language";
import { ThemeName } from "../../../shared/types/ThemeName";
import { closeSettingsPanel } from "../slices/settingsPanelSlice";
import { setLanguage, setTheme } from "../slices/uiSettingsSlice";
import { TRANSLATIONS_NAMESPACES } from "../../../i18n/config";

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
          <FormControl component="fieldset" sx={{ p: 1 }}>
            <FormLabel sx={{ mb: 2, fontSize: (theme) => theme.typography.h5 }}>
              {t("settings.title")}
            </FormLabel>
            <FormGroup sx={{ display: "flex", gap: 2 }}>
              <FormControl>
                <FormLabel>{t("settings.theme.label")}</FormLabel>
                <Select
                  labelId="theme-label"
                  id="theme"
                  size="small"
                  value={theme}
                  onChange={(event) => handleSelectedThemeChange(event)}
                >
                  {Object.values(ThemeName).map((item) => (
                    <MenuItem key={item} value={item}>
                      {t(`settings.theme.options.${item}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>{t("settings.language.label")}</FormLabel>
                <Select
                  labelId="lang-label"
                  id="lang"
                  size="small"
                  value={language}
                  onChange={(event) => handleLanguageChange(event)}
                >
                  {Object.values(Language).map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      {t(`settings.language.options.${lang}`)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FormGroup>
          </FormControl>
        </StyledSettingsPanel>
      }
    ></Sidebar>
  );
}

export default SettingsPanel;
