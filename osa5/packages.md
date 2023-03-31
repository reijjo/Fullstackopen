# FRONTEND
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
		"cypress/globals": true
	}

# BACKEND
lisaa package.json =>
	"scripts": {
		...
		"start:test": "NODE_ENV=tet node index.js"
	}

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