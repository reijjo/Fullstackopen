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
