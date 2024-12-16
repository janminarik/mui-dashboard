import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "unused-imports/no-unused-imports": "error", // Odstráni nepoužité importy
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all", // Kontroluje všetky nepoužité premenné
          varsIgnorePattern: "^_", // Ignoruje premenné začínajúce na "_"
          args: "after-used", // Skontroluje nepoužité argumenty vo funkciách
          argsIgnorePattern: "^_", // Ignoruje argumenty začínajúce na "_"
        },
      ],
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            // Dôležité knižnice
            ["^react", "^@?\\w"],
            // Komponenty a utility z projektu
            ["^(@|src|components|utils)(/.*|$)"],
            // Štýly
            ["^.+\\.s?css$"],
            // Všetko ostatné
            ["^"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
    },
  }
);
