# FRONTEND
npm install prop-types
npm install --save-dev eslint-plugin-jest
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event
npm install --save-dev cypress
npm install eslint-plugin-cypress --save-dev


lisaa package.json =>
	"scripts": {
		...,
		"cypress:open": "cypress open"
	}

lisaa eslintrc.js =>
	"env": {
		...,
		"jest/globals": true,		<- THIS
		"cypress/globals": true	<- THIS
	},
	'plugins': [
		...,
		'cypress'	<-THIS
	],
	'extends': [
		...,
		'plugin:cypress/recommended'	<-- THIS
	]


# BACKEND
npm install --save-dev cross-env
lisaa package.json =>
	"scripts": {
		...
		"start:test": "NODE_ENV=test node index.js",						<- THIS
		"dev:test": "cross-env NODE_ENV=test nodemon index.js"	<- THIS
	}

# cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000'
  },
	env: {
		BACKEND: 'http://localhost:3001/api'
	}
})

# How to use cypress
	start backend and front end
	open new terminal in the frontend =>
		npm run cypress:open

		E2E Testing
		Chrome
		Create new spec
		give name to your test

		make tests to that file
		click file name on the cypress browser window to run the tests

		OR

		npm run test:e2e  <- on terminal