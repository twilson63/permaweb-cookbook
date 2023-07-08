---
locale: pt
---
# Kit Inicial do Create React App

Este guia irá orientá-lo passo a passo para configurar seu ambiente de desenvolvimento para construir e implantar um aplicativo React na permaweb.

## Pré-requisitos

- Conhecimento básico de TypeScript (Não obrigatório) - [https://www.typescriptlang.org/docs/](Aprenda TypeScript)
- NodeJS v16.15.0 ou superior - [https://nodejs.org/en/download/](Baixe o NodeJS)
- Conhecimento de ReactJS - [https://reactjs.org/](Aprenda ReactJS)
- Conheça git e comandos comuns de terminal

## Dependências de Desenvolvimento

- TypeScript
- Gerenciador de Pacotes NPM ou Yarn

## Etapas

### Criar Projeto

Se você não estiver familiarizado com TypeScript, você pode excluir a verificação extra `--template typescript`

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
npx create-react-app permaweb-create-react-app --template typescript
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn create react-app permaweb-create-react-app --template typescript
```

  </CodeGroupItem>
</CodeGroup>

### Acessar o Diretório do Projeto

```sh
cd permaweb-create-react-app
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


### Executar o Aplicativo

Agora precisamos verificar se tudo está funcionando antes de prosseguir para a próxima etapa, execute
<CodeGroup>
  <CodeGroupItem title="NPM">

```console:no-line-numbers
npm start
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
yarn start
```

  </CodeGroupItem>
</CodeGroup>
Isso iniciará um novo servidor de desenvolvimento localmente em sua máquina. Por padrão, ele usa `PORTA 3000`, se esta PORTA já estiver em uso
pode pedir que você mude para outra PORTA disponível no Terminal


### Modificar o package.json para conter a seguinte configuração

```json
{
  ...
  "homepage": ".",
}
```


### Configurar o Roteamento

Agora modifique o aplicativo e adicione uma nova rota, como uma página "sobre", primeiro crie mais 2 arquivos .tsx. (se você excluiu a verificação extra `--template typescript`, então a extensão do arquivo de componente deve ser `.jsx ou .js`)

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
      Bem-vindo à Permaweb!
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

Precisamos atualizar o App.tsx para gerenciar as diferentes páginas

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

::: info Roteamento de Hash
Observe que estamos envolvendo as rotas em um HashRouter e usando o componente Link do react-router-dom para construir links.
Isso é importante na permaweb em seu estado atual, garantirá que as rotas funcionem corretamente porque os aplicativos
são servidos em um caminho como `https://[gateway]/[TX]`
:::

## Implantação Permanente

### Gerar Carteira

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

Precisamos do Bundlr para implantar nosso aplicativo na Permaweb, ele fornece upload e recuperação instantânea de dados

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
Você precisará adicionar AR a esta carteira e financiar sua carteira Bundlr para poder fazer o upload deste aplicativo. Consulte [https://bundlr.network](https://bundlr.network) e [https://www.arweave.org/](https://www.arweave.org/) para obter mais informações.
:::

### Atualizar package.json

```json
{
  ...
  "scripts": {
    ...
    "deploy": "bundlr upload-dir ./build -h https://node2.bundlr.network --wallet ./wallet.json -c arweave --index-file index.html --no-confirmation"
  }
  ...
}
```

### Executar build

Agora é hora de gerar uma compilação, execute

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

### Executar implantação

Finalmente, estamos prontos para implantar nosso primeiro aplicativo Permaweb

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
Agora você deve ter um aplicativo React na Permaweb! Ótimo trabalho!
:::

::: info ERRO
Se você receber este erro `Not enough funds to send data`, você precisa financiar algum AR em sua carteira Bundlr e tentar implantá-la novamente, execute
:::

<CodeGroup>
  <CodeGroupItem title="NPM">
  
```console:no-line-numbers
bundlr fund 1479016 -h https://node1.bundlr.network -w wallet.json -c arweave
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">
  
```console:no-line-numbers
bundlr fund 1479016 -h https://node1.bundlr.network -w wallet.json -c arweave
```

  </CodeGroupItem>
</CodeGroup>

::: info
O número acima 1479016 é uma quantidade de AR expressa em winstons, a menor unidade de AR. Isso levará algum tempo para propagar para sua carteira Bundlr. Volte em 10-20 minutos e tente executar a implantação novamente.
:::

## Repositório

Uma versão concluída deste exemplo está disponível aqui: [https://github.com/VinceJuliano/permaweb-create-react-app](https://github.com/VinceJuliano/permaweb-create-react-app)

## Resumo

Esta é uma versão Create React App de publicar um aplicativo React na permaweb. Você pode descobrir novas maneiras de implantar um aplicativo na permaweb ou verificar outros kits iniciais neste guia!