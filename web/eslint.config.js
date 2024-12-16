import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import reactPlugin from "eslint-plugin-react";
import perfectionist from "eslint-plugin-perfectionist";

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
      react: reactPlugin,
      reactHooks,
      perfectionist,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // ...reactHooks.configs.recommended.rules,
      ...perfectionist.configs["recommended-alphabetical"].rules,
      // "react-hooks/rules-of-hooks": "error", // Kontrola pravidiel pre hooky
      // "react-hooks/exhaustive-deps": "warn", // Overenie závislostí v efektových hookoch
      // "react/sort-comp": [
      //   "warn",
      //   {
      //     order: ["static-methods", "instance-variables", "lifecycle", "everything-else", "render"],
      //   },
      // ],
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
