import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginImport from "eslint-plugin-import";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Include ALL JS/JSX files
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginJsxA11y,
      import: pluginImport,
      "react-refresh": pluginReactRefresh,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        window: true,
        document: true,
        console: true,
      },
    },
    settings: {
      react: {
        version: "18.2",
      },
    },
    rules: {
      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-undef": "error", // This should catch undeclared JSX components
      "react/jsx-uses-vars": "error", // This helps with JSX variables
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off",
      "react/jsx-key": "warn",

      // A11y
      "jsx-a11y/alt-text": "warn",

      // General JS
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "off",
    },
  },
];
