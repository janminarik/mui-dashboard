import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

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
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
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
    },
  }
);
