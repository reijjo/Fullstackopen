# REACT NATIVE

## Create expo-app

npx create-expo-app <PROJECTNAME> --template expo-template-blank@sdk-46
-It's gonna take a while.

## Go to the project folder and install a few dependencies

npx expo install react-native-web@~0.18.7 react-dom@18.2.0 @expo/webpack-config@^0.17.0

## Start the project

- npm start
- press w
- - if script fails with error, switch to Node version 16.19.0.
- - install nvm (curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash)
- - source ~/.zshrc (check that nvm is installed 'nvm')
- - nvm install 16.19.0
- Make a small change to App.js file to see that everything works

## Set up the Android emulator with Android studio

https://docs.expo.dev/workflow/android-studio-emulator/

## Set up the iOS simulator with Xcode

https://docs.expo.dev/workflow/ios-simulator/

## Install eslint

npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react eslint-plugin-react-native

### Add ESLint configuration to a .eslintrc file

```
{
  "plugins": ["react", "react-native"],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "babelOptions": {
      "configFile": "/Users/reijjo/workspace/Fullstackopen/osa10/rate-repository-app/babel.config.js"
    }
  },
  "env": {
    "react-native/react-native": true
  },
  "rules": {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
}

```

### Add line to package.json file

```
{
  // ...
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "eslint ./src/**/*.{js,jsx} App.js --no-error-on-unmatched-pattern" <--This line
  },
  // ...
}
```
