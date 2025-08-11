import antfu from "@antfu/eslint-config";

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
  ignores: [
    // Dependency and build output
    "node_modules/**",
    ".pnpm-store/**",
    ".nuxt/**",
    ".output/**",
    ".nitro/**",
    ".cache/**",
    "dist/**",

    // Database migrations and generated data
    "lib/db/migrations/**",

    // IDE, tooling, and VCS
    ".vscode/**",
    ".idea/**",
    ".cursor/**",
    ".git/**",
    ".husky/_/**",

    // Patches & vendor
    "patches/**",

    // Logs & temp files
    "*.log",
    "*.tmp",
    ".DS_Store",
    "Thumbs.db",

    // Config & lock files
    "pnpm-lock.yaml",
    "package-lock.json",
    "yarn.lock",
    "components.json",

    // Public static assets (optional, if you don't want to lint these)
    "public/**",

    // Ignore everything in scripts if you don't want to lint scripts
    // "scripts/**",
  ],
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
        /.*\.md$/,
      ],
    }],
  },
}, {
  files: ["components/**"],
  rules: {
    "unicorn/filename-case": ["error", {
      case: "pascalCase",
      ignore: [
        /.*\.md$/,
      ],
    }],
    "symbol-description": ["off"],
  },
}, {
  files: ["components/ui/**/*.ts"],
  rules: {
    "unicorn/filename-case": ["error", {
      case: "camelCase",
    }],
  },
}, {
  files: ["composables/**/*.ts"],
  rules: {
    "unicorn/filename-case": ["error", {
      case: "camelCase",
    }],
  },
}, {
  files: ["scripts/**/*.ts"],
  rules: {
    "no-console": ["off"],
  },
}));
