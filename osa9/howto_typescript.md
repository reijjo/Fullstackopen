# First bite

## Make Backend Folder

mkdir server
cd server
npm init -y

### Make .gitignore

touch .gitignore

node_modules
.DS_Store

## Install typescript dependencies

npm install --save-dev ts-node typescript
npm install --save-dev @types/node
npm install express
npm install --save-dev @types/express
npm install --save-dev ts-node-dev <!-- nodemon for typescript -->

## Add to package.json

```json
{
  // ...
  "scripts": {
    "ts-node": "ts-node",
    "start": "ts-node index.ts",
    "dev": "ts-node-dev index.ts"
  }
  // ...
}
```

## make tsconfig.json file

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
    "moduleResolution": "node"
  }
}
```

The tsconfig.json file is used to define how the TypeScript compiler should interpret the code, how strictly the compiler should work, which files to watch or ignore, and much more. For now, we will only use the compiler option noImplicitAny, which does not require having types for all variables used.

## install eslint

npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser

### Make .eslintrc file

```
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-explicit-any": 2
  }
}
```

## make index.ts file

```ts
import express from "express";
const app = express();

app.get("/ping", (_req, res) => {
  res.send("pong");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## How to run

npm run ts-node
...
npm run ts-node file.ts -- -s --someoption ??

# OKAY REAL DEAL:

mkdir PROJECT
npm init -y

touch .gitignore

```
node_modules
.DS_Store
```

npm install typescript --save-dev

## package.json

```.json
{
  // ..
  "scripts": {
    "tsc": "tsc"
  },
  // ..
}
```

## npm run tsc -- --init

makes tsconfig.js file

### suggested to be active for now:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "outDir": "./build/",
    "module": "commonjs",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true
  }
}
```

## install express & eslint

npm install express
npm install --save-dev eslint @types/express @typescript-eslint/eslint-plugin @typescript-eslint/parser

## create .eslintrc file

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "plugins": ["@typescript-eslint"],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "rules": {
    "@typescript-eslint/semi": ["error"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "argsIgnorePattern": "^_" }
    ],
    "no-case-declarations": "off"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": "Fullstackopen/osa9/example/ilari/"
  }
}
```

## install 'nodemon' for typescript

npm install --save-dev ts-node-dev

## add to package.json file

```json
{
  // ...
  "scripts": {
    "tsc": "tsc",
    "dev": "ts-node-dev index.ts",
    "lint": "eslint --ext .ts ."
  }
  // ...
}
```

## create index.ts file

```ts
import express from "express";
const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

npm run dev to start server and go to browser to http://localhost:3000/ping to see that everything works

## production build by TypeScript compilier

Since we have defined the outdir in our tsconfig.json, nothing's left but to run the script npm run tsc.

Just like magic, a native runnable JavaScript production build of the Express backend is created in file index.js inside the directory build.

Currently, if we run ESlint it will also interpret the files in the build directory. We don't want that, since the code there is compiler-generated. We can prevent this by creating a .eslintignore file that lists the content we want ESlint to ignore, just like we do with git and .gitignore.

Let's add an npm script for running the application in production mode in package.json file:

```json
{
  // ...
  "scripts": {
    "tsc": "tsc",
    "dev": "ts-node-dev index.ts",
    "lint": "eslint --ext .ts .",
    "start": "node build/index.js"
  }
  // ...
}
```

When we run the app with npm start, we can verify that the production build also works

# Frontend:

npx create-react-app my-app --template typescript

## make .eslintrc file

```json
{
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["react", "@typescript-eslint"],
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "rules": {
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "react/react-in-jsx-scope": 0
  }
}
```

## package.json file

```json
{
  // ...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint './src/**/*.{ts,tsx}'" /* add this line */
  }
  // ...
}
```

## index.tsx

```tsx
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
```

## App.tsx

```tsx
const App = () => {
  return <div>hi</div>;
};

export default App;
```
