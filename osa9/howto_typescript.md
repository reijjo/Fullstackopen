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

## Add to package.json

```json
{
  // ...
  "scripts": {
    "ts-node": "ts-node"
  }
  // ...
}
```

## make tsconfig.json file

```json
{
  "compilerOptions": {
    "noImplicitAny": false
  }
}
```

The tsconfig.json file is used to define how the TypeScript compiler should interpret the code, how strictly the compiler should work, which files to watch or ignore, and much more. For now, we will only use the compiler option noImplicitAny, which does not require having types for all variables used.

## How to run

npm run ts-node
...
npm run ts-node file.ts -- -s --someoption ??
