import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import perfectionist from "eslint-plugin-perfectionist";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

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
      react,
      "react-hooks": reactHooks,
      perfectionist,
      import: importPlugin,
      "unused-imports": unusedImports,
      prettier,
    },
    rules: {
      ...perfectionist.configs["recommended-alphabetical"].rules,
      "prettier/prettier": [
        "error",
        {
          printWidth: 150,
        },
      ], // Spustenie Prettier ako lint pravidla
      "unused-imports/no-unused-imports": "error", // Odstráni nepoužité importy
      "react-hooks/rules-of-hooks": "error", // Kontrola správneho používania hookov
      "react-hooks/exhaustive-deps": "warn", // Overenie závislostí v efektových hookoch
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal"],
          "newlines-between": "always",
        },
      ],
    },
    settings: {
      react: {
        version: "detect", // Automatická detekcia verzie Reactu
      },
    },
  },
);
