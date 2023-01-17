# Create React App Starter Kit

This guide will walk you through in a step by step flow to configure your development environment to build and deploy a permaweb application.

## Prerequisites 

* Know typescript
* NodeJS v16.15.0 or greater
* Know React - [https://reactjs.org/](https://reactjs.org/)
* Know git and common terminal commands

## Development Dependencies

* TypeScript
* npm

## Steps

## Create Project

```sh
npx create-react-app permaweb-create-react-app --template typescript
```


## Change into the directory created above

```sh
cd permaweb-create-react-app
```

## Install react-router-dom

```sh
npm install react-router-dom --save
```

## Run the app to make sure it words
```sh
npm start
```

visit http://localhost:3000 to see your app working

## Modify the package.json to contain the following config
```json
{
  ...
  "homepage": ".",
}
```

## Now modify the application and add a new route such as an about page, first create 2 more .tsx files

```sh
touch src/HomePage.tsx
touch src/About.tsx
```

## HomePage.tsx
```ts
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      Welcome to the Permaweb! 
      <Link to={"/about/"}>
         <div>About</div>
      </Link>
    </div>
  );
}
  
export default HomePage;
```

## About.tsx

```ts
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      Welcome to the About page!
      <Link to={"/"}>
         <div>Home</div>
      </Link>
    </div>
  );
}

export default About;

```

## Modify App.tsx to route to both files

## App.tsx
```ts
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import About from "./About";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={
          <HomePage></HomePage>
        } />
        <Route path={"/about/"} element={
          <About></About>
        } />
      </Routes>
    </HashRouter>
  );
}

export default App;
```



::: info Hash Routing
Note that we are wrapping the routes in a HashRouter and using the react-router-dom Link component to build links.
This is important on the permaweb in its current state, it will ensure the routes work properly because applications
are served on a path like `https://[gateway]/[TX]` 
:::



## Deploy 

### Generate Wallet

```sh
npm install --save arweave
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### install bundlr

```sh
npm install --global @bundlr-network/client
```

### You will need to add AR to this wallet and fund your bundlr wallet to be able to upload this app. See [https://bundlr.network](https://bundlr.network) and [https://www.arweave.org/](https://www.arweave.org/) for more information.

### update package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "bundlr upload-dir ./build -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
}
```

### Run build
```
npm run build
```

### Run deploy

```sh
npm run deploy
```

::: tip SUCCESS 
You should now have a React Application on the Permaweb! Great Job!
:::

## Repository

A completed version of this example is available here: [https://github.com/VinceJuliano/permaweb-create-react-app](https://github.com/VinceJuliano/permaweb-create-react-app)

## Summary

This is a Create React App version of publishing a React app on the permaweb. You may discover new ways to deploy an app on the permaweb or checkout other starter kits in this guide!