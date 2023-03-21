## how to start
	npm install eslint --save-dev
	npx esli
	✔ How would you like to use ESLint? · problems
	✔ What type of modules does your project use? · commonjs
	✔ Which framework does your project use? · none
	✔ Does your project use TypeScript? · No / Yes
	✔ Where does your code run? · browser
	✔ What format do you want your config file to be in? · JavaScript

## add rules to .eslintrc.js
	 'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
				'eqeqeq': 'error',
				'no-trailing-spaces': 'error',
    		'object-curly-spacing': [
    		    'error', 'always'
    		],
    		'arrow-spacing': [
    		    'error', { 'before': true, 'after': true }
    		],
				'no-console': 0,
    }

### One file check
	npx eslint index.js

### add script to package.json file
	"lint": "eslint ."

### add .eslintignoge file
	build

### you can add eslint plugin to VSCode


### usage:
	npm run lint -- --fix