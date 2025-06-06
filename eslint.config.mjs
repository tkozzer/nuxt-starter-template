import antfu from "@antfu/eslint-config";

// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

// TODO: add tailwindcss plugin when compatitibility v4.0 is released

export default withNuxt(antfu({
  type: "app",
  vue: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
  ignores: [".pnpm-store/**", "**/migrations/*"],
}, {
  rules: {
    "vue/max-attributes-per-line": ["error", {
      singleline: {
        max: 2,
      },
      multiline: {
        max: 1,
      },
    }],
    "ts/no-redeclare": "off",
    "ts/consistent-type-definitions": ["error", "type"],
    "no-console": ["warn"],
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
    "perfectionist/sort-imports": ["error", {
      tsconfigRootDir: ".",
    }],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: [
        "README.md",
      ],
    }],
  },
}, {
  // Components should use PascalCase
  files: ["components/**/*.vue"],
  rules: {
    "unicorn/filename-case": ["error", {
      case: "pascalCase",
    }],
  },
}, {
  // Composables should use camelCase
  files: ["composables/**/*.ts"],
  rules: {
    "unicorn/filename-case": ["error", {
      case: "camelCase",
    }],
  },
}, {
  // Utils should use camelCase
  files: ["utils/**/*.ts"],
  rules: {
    "unicorn/filename-case": ["error", {
      case: "camelCase",
    }],
  },
}, {
  // Disable filename-case for dynamic route files (they contain square brackets)
  files: ["**/*\\[*"],
  rules: {
    "unicorn/filename-case": "off",
  },
}, {
  // Disable filename-case for files with special Nuxt suffixes
  files: ["**/*.global.*", "**/*.client.*", "**/*.server.*"],
  rules: {
    "unicorn/filename-case": "off",
  },
}, {
  // Disable filename-case for config files
  files: ["nuxt.config.*", "app.config.*", "eslint.config.*", "tsconfig.*"],
  rules: {
    "unicorn/filename-case": "off",
  },
}));
