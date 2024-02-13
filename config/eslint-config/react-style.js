const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {

	extends: [
    	//"eslint:recommended",
		//"prettier",
		"plugin:prettier/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
		"eslint-config-turbo",
		resolve(__dirname, "./custom-config.js")
	],

  	plugins: [
		"only-warn",
		"@typescript-eslint",
        "prettier",
        /**
		 * see: https://eslint.style/packages/default
		 */
        "@stylistic"
	],

	/**
     * see: https://www.npmjs.com/package/@typescript-eslint/parser
	 * 
	 * Specify the parser options in the local `eslint` of each package
     */
    parser: "@typescript-eslint/parser",


	rules: {
        "prettier/prettier": [  //or whatever plugin that is causing the clash
            "error",
            {
                "tabWidth":4,
                "arrowParens": "always"
            }
        ],
        '@stylistic/no-extra-parens': ["error", "all", {
            ignoreJSX: "all",
            enforceForArrowConditionals: false
        }],
        /**
         * do not ask for destructuring `props`
         */
        "react/destructuring-assignment": "off",
        /**
         * allow to use type `any`
         */
        "@typescript-eslint/no-explicit-any": "off",

        /**
         * allow unnamed functions
         */
        "func-names": "off",

        /**
         * disable "JSX not allowed in files with extension '.tsx'    react/jsx-filename-extension"
         */
        "react/jsx-filename-extension": "off",

        "@stylistic/no-extra-parens": "off"

        
    },
  	
	globals: {
    	React: true,
    	JSX: true,
  	},
  	env: {
    	browser: true,
  	},
	settings: {
		"import/resolver": {
			typescript: {
				project,
			},
		},
	},
	ignorePatterns: [
		// Ignore dotfiles
		".*.js",
		"node_modules/",
		"dist/",
	],
	overrides: [
		// Force ESLint to detect .tsx files
		{ files: ["*.js?(x)", "*.ts?(x)"] },
	],
};