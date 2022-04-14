## Guide

1. Install `node.js` and yarn (optional)
1. Change the name of the package in the `package.json`
1. Run following commands

   ```bash
   yarn install
   ```

### Libraries installed

1. Typescript
   ```zsh
   yarn add typescript -g
   ```
1. For using Express and MongoDB.
   ```
   yarn add express cors mongoose
   ```
   Types
   ```
   yarn add -D @types/node @types/express @types/mongoose @types/cors
   ```
1. To compile the TypeScript code and start the server concurrently.
   ```zsh
   yarn add -D concurrently nodemon
   ```
