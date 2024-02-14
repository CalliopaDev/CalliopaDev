module.exports = {
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

        "@stylistic/no-extra-parens": "off",

        /**
         * enforce the use of `camelCase` for filenames
         */
        "unicorn/filename-case": [
            "error",
            {
                "case": "camelCase"
            }
        ]

    }
}