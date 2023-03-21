# npm init add stuff to package.json scripts
	"start": "node index.js",
	"dev": "nodemon index.js",
	"lint": "eslint .",

## packages
	npm install express
	npm install mongoose
	npm install cors
	npm install dotenv
	npm install morgan
	npm install --save-dev nodemon
	npm install --save-dev eslint

## eslint config
	npx eslint --init
	✔ How would you like to use ESLint? · problems
	✔ What type of modules does your project use? · commonjs
	✔ Which framework does your project use? · none
	✔ Does your project use TypeScript? · No / Yes
	✔ Where does your code run? · browser
	✔ What format do you want your config file to be in? · JavaScript

	=> add 'build' to .eslintignore file

	=> add rules to .eslintrc.js file
	'rules': {
        'indent': [
            'error',
            2
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
### how to use eslint:
	npm run lint -- --fix

## add .gitignore
	node_modules
	.env
	.DS_Store

## make folders
	controllers
	models
	requests
	utils

## make files
	app.js
	index.js
	.env

# FILES
## app.js

## Utils folder make files:
	config.js
	logger.js
	middleware.js
