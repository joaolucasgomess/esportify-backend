import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended.concat({
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-unused-vars": "warn",
		},
	}),
	eslintPluginPrettier,
];
