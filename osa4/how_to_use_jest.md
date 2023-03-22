# npm install --save-dev jest

## add script to package.json and testenviroment on the end of the file
	"test": "jest --verbose"

	 "jest": {
   "testEnvironment": "node"
 }

## add to .eslintrc.js file
	module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true,
    'jest': true, <--- THIS!

## make folder 'tests' and alll your tests there for example:
### reverse.test.js file:
	const reverse = require('../utils/for_testing').reverse

	test('reverse of a', () => {
	  const result = reverse('a')

	  expect(result).toBe('a')
	})

	test('reverse of react', () => {
	  const result = reverse('react')

	  expect(result).toBe('tcaer')
	})

	test('reverse of saippuakauppias', () => {
	  const result = reverse('saippuakauppias')

	  expect(result).toBe('saippuakauppias')
	})

## how to use:
	npm test