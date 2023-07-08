---
locale: pt
---
# Vite Starter Kit

Este guia irá guiá-lo passo a passo na configuração do seu ambiente de desenvolvimento para construir e implantar um aplicativo react permaweb.

## Pré-requisitos

- Conhecimento básico de TypeScript (Não Obrigatório) - [https://www.typescriptlang.org/docs/](Aprenda TypeScript)
- NodeJS v16.15.0 ou superior - [https://nodejs.org/en/download/](Baixe o NodeJS)
- Conhecimento de ReactJS - [https://reactjs.org/](Aprenda ReactJS)
- Conhecimento de git e comandos comuns de terminal

## Dependências de Desenvolvimento

- TypeScript
- Gerenciador de Pacotes NPM ou Yarn

## Passos

### Criar Projeto

Se você não está familiarizado com TypeScript, você pode usar o template "react" (`--template react`)

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm create vite@latest my-arweave-app -- --template react-ts
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn create vite my-arweave-app --template react-ts
```

  </CodeGroupItem>
</CodeGroup>

### Mudar para o Diretório do Projeto

```sh
cd my-arweave-app
```


### Instalar react-router-dom

Você precisa instalar este pacote para gerenciar as rotas entre diferentes páginas

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install react-router-dom --save
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add react-router-dom -D
```

  </CodeGroupItem>
</CodeGroup>


### Rodar o Aplicativo

Agora precisamos verificar se tudo está funcionando perfeitamente antes de prosseguirmos para o próximo passo. Execute
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm run dev
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn dev
```

  </CodeGroupItem>
</CodeGroup>
ele irá iniciar um novo servidor de desenvolvimento localmente em sua máquina, por padrão ele usa a `PORTA 3000` se essa PORTA já estiver em uso
ele pode pedir que você mude para outra PORTA disponível no Terminal


### Configurar os tipos de wallet

Se você deseja usar [ArConnect](https://arconnect.io), [Arweave.app](https://arweave.app) ou outras carteiras baseadas em navegador, você pode instalar o pacote de tipos do ArConnect para ter declarações para `window.arweaveWallet`.
<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install arconnect -D
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arconnect -D
```

  </CodeGroupItem>
</CodeGroup>

Após instalar o pacote, você precisará adicioná-lo ao seu arquivo `src/vite-env.d.ts`.
```ts
/// <reference types="arconnect" />
```

### Configurar as Rotas

Agora modifique o aplicativo e adicione novas rotas, como uma página sobre, primeiro crie mais 2 arquivos .tsx. (se você usou o template react JS vanilla, certifique-se de que a extensão do arquivo de componente deve ser `.jsx` ou `.js`)

```sh
touch src/HomePage.tsx
touch src/About.tsx
```

#### HomePage.tsx

```ts
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      Bem-vindo ao Permaweb!
      <Link to={"/about/"}>
        <div>Sobre</div>
      </Link>
    </div>
  );
}

export default HomePage;
```

#### About.tsx

```ts
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      Bem-vindo à página Sobre!
      <Link to={"/"}>
        <div>Início</div>
      </Link>
    </div>
  );
}

export default About;
```

#### Modificar App.tsx

Precisamos atualizar o App.tsx para gerenciar diferentes páginas

```ts
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import About from "./About";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/about/"} element={<About />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
```

::: info Roteamento com Hash
Note que estamos envolvendo as rotas em um HashRouter e usando o componente Link do react-router-dom para construir links.
Isso é importante no permaweb em seu estado atual, isso garantirá que as rotas funcionem corretamente porque os aplicativos
são servidos em um caminho como `https://[gateway]/[TX]`
:::

## Implantar Permanentemente

### Gerar Wallet

Precisamos do pacote `arweave` para gerar uma carteira

<CodeGroup>
<CodeGroupItem title="NPM">

```console:no-line-numbers
npm install --save arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn add arweave -D
```

  </CodeGroupItem>
</CodeGroup>

em seguida, execute este comando no terminal

```sh
node -e "require('arweave').init({}).wallets.generate().then(JSON.stringify).then(console.log.bind(console))" > wallet.json
```

### Configurar Bundlr

Precisamos do Bundlr para implantar nosso aplicativo na Permaweb, ele fornece upload e recuperação instantâneos de dados

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm install --global @bundlr-network/client
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn global add @bundlr-network/client
```

  </CodeGroupItem>
</CodeGroup>

::: info
Você precisará adicionar AR a esta carteira e financiar sua carteira do bundlr para poder fazer o upload deste aplicativo. Consulte [https://bundlr.network](https://bundlr.network) e [https://www.arweave.org/](https://www.arweave.org/) para obter mais informações.
:::

### Atualizar package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "bundlr upload-dir ./dist -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
  ...
}
```

### Executar build

Agora é hora de Gerar Build

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm run build
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn build
```

  </CodeGroupItem>
</CodeGroup>

### Executar deploy
Finalmente estamos prontos para implantar nosso Primeiro Aplicativo Permaweb

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npm run deploy
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn deploy
```

  </CodeGroupItem>
</CodeGroup>

::: tip SUCESSO
Agora você deve ter um aplicativo React na Permaweb! Bom trabalho!
:::

::: error
Se você receber este erro `Not enough funds to send data`, você precisará adicionar AR à sua carteira e tentar implantá-lo novamente.
:::