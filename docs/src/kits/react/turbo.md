# React Starter Kit w/vite & ArDrive

This guide will walk you through in a step by step flow to configure your development environment to build and deploy a permaweb react application.

## Prerequisites

-   Basic Typescript Knowledge (Not Mandatory) - [https://www.typescriptlang.org/docs/](Learn Typescript)
-   NodeJS v16.15.0 or greater - [https://nodejs.org/en/download/](Download NodeJS)
-   Knowledge of ReactJS - [https://reactjs.org/](Learn ReactJS)
-   Know git and common terminal commands

## Development Dependencies

-   TypeScript
-   NPM or Yarn Package Manager

## Steps

### Install ardrive cli

```sh
npm i -g ardrive-cli
```

> NOTE: if you do not have a wallet, lets create one for uploading apps.

### Create Seed Phrase

```sh
ardrive generate-seedphrase
```

Copy the output to use to generate wallet

### Create Wallet

```sh
ardrive generate-wallet -s "SEED_PHRASE_FROM_ABOVE" > wallet.json
```

### Create React App

```sh
yarn create vite my-arweave-app --template react-ts
cd my-arweave-app
yarn
```

### Add React Router DOM

```sh
yarn add react-router-dom
```

We need to use the hash-router to create a working app on arweave.

### Page Components

```sh
touch src/Home.tsx src/About.tsx
```

src/Home.tsx

```tsx
import { Link } from "react-router-dom";

function Home() {
	return (
		<div>
			Welcome to the Permaweb!
			<Link to={"/about/"}>
				<div>About</div>
			</Link>
		</div>
	);
}

export default Home;
```

src/About.tsx

```tsx
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

#### Modify App.tsx

We need to update the App.tsx to manage different pages

```tsx
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import About from "./About";

function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path={"/"} element={<Home />} />
				<Route path={"/about/"} element={<About />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
```

#### Modify index.css

Alter the `body` selector

```css
body {
  margin: 0;
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  place-items: center;
  min-width: 100%;
  min-height: 100vh;
}
```

```sh
yarn dev
```

### Building React App

#### Modify vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
})
```
#### Build App

```sh
yarn build
```

### Publishing to Arweave

#### create drive

```sh
ardrive create-drive -w ../wallet.json -n my-arweave-app --turbo
```

#### create folder

```sh
ardrive create-folder -w ../wallet.json -n "v1" -F __ROOT_FOLDER_ID__ --turbo
export V1=__FOLDER_ID__
```

#### upload files

```sh
cd dist
ardrive upload-file -w ../../wallet.json -l ./ -F ${V1} --turbo
```

#### create manifest

```sh
cd ..
ardrive create-manifest -w ../wallet.json -f ${V1} --turbo --dry-run
```

> NOTE: We need to grab the manifest object and edit it, we need to change the index to point to "index.html", and remove all of the "./" for each path, save file as manifest.json in the app root directory.

```sh
ardrive upload-file -w ../wallet.json -l ./manifest.json --content-type application/x.arweave-manifest+json -F ${V1} --turbo
```

### Congrats!

You just published a react application on the Permaweb! This app will be hosted forever!

