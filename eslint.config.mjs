import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended, // Add recommendedConfig to resolve the error
})

const eslintConfig = [
  ...compat.config({
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ["next", "eslint:recommended"],
    rules: {
      // Add or override rules here if needed
      "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    },
    settings: {
      next: {
        rootDir: process.cwd(), // Ensures Next.js root directory is correctly set
      },
    },
  }),
]

export default eslintConfig
