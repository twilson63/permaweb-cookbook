---
locale: pt
---
# Ação do Github

::: danger
Este guia é apenas para fins educacionais, e você deve usá-lo para aprender opções de como você pode implantar sua aplicação. Neste guia, estamos confiando em um recurso de terceiros `github` de propriedade da `microsoft` para proteger nossas informações secretas, em sua documentação, eles criptografam segredos em seu armazenamento usando a `libsodium sealed box`, você pode encontrar mais informações sobre suas práticas de segurança aqui. https://docs.github.com/en/actions/security-guides/encrypted-secrets
:::

As Ações do Github são pipelines de CI/CD que permitem aos desenvolvedores acionar tarefas automatizadas por meio de eventos gerados pelo sistema de fluxo de trabalho do github. Essas tarefas podem ser praticamente qualquer coisa, neste guia mostraremos como você pode usar as ações do github para implantar sua aplicação permaweb na permaweb usando o bundlr and ArNS.

::: tip
Este guia requer compreensão das ações do github e você deve ter alguns ArNS Test Tokens, vá para https://ar.io/arns/ para mais detalhes.
:::

::: warning
Este guia não inclui testes ou outras verificações que você possa querer adicionar ao seu fluxo de trabalho de produção.
:::

## Criar script de implantação

Um script de implantação é um script que realiza o trabalho pesado de implantar sua aplicação, utilizaremos `@bundlr-network/client` e `warp-contracts` para publicar nossa aplicação e registrar a aplicação recém-publicada no ArNS.

Instalar dependências para implantação

```console
npm install --save-dev @bundlr-network/client
npm install --save-dev warp-contracts
npm install --save-dev arweave
```

Criar arquivo `deploy.mjs`

```js
import Bundlr from '@bundlr-network/client'
import { WarpFactory, defaultCacheOptions } from 'warp-contracts'
import Arweave from 'arweave'

const ANT = '[SEU CONTRATO ANT]'
const DEPLOY_FOLDER = './dist'
const BUNDLR_NODE = 'https://node2.bundlr.network'

const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' })
const jwk = JSON.parse(Buffer.from(process.env.PERMAWEB_KEY, 'base64').toString('utf-8'))

const bundlr = new Bundlr.default(BUNDLR_NODE, 'arweave', jwk)
const warp = WarpFactory.custom(
  arweave,
  defaultCacheOptions,
  'mainnet'
).useArweaveGateway().build()

const contract = warp.contract(ANT).connect(jwk)
// enviar pasta
const result = await bundlr.uploadFolder(DEPLOY_FOLDER, {
  indexFile: 'index.html'
})


// atualizar ANT
await contract.writeInteraction({
  function: 'setRecord',
  subDomain: '@',
  transactionId: result.id
})

console.log('Cozinha implantada, aguarde de 20 a 30 minutos para atualização do ArNS!')
```

## Adicionar script ao package.json

Crie uma nova propriedade de script chamada `deploy`, chame o script de construção e depois chame `node deploy.mjs` no valor da propriedade de implantação dos scripts.

package.json

```json
  ...
  "scripts": {
    "dev": "vuepress dev src",
    "build": "vuepress build src",
    "deploy": "yarn build && node deploy.mjs"
  },
  ...
```


## Criar ação do github

Crie um arquivo `deploy.yml` na pasta `.github/workflows`, este arquivo instrui as ações do github a fazer a implantação quando um evento de push é acionado no ramo `main`.

```yml
name: publicar

on:
  push:
    branches:
      - "main"

jobs:
  publicar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 18.x
      - run: yarn
      - run: yarn deploy
        env:
          KEY: ${{ secrets.PERMAWEB_KEY }}
```

## Resumo

No repositório do projeto, vá para as configurações e segredos, adicione um novo segredo ao repositório, este segredo será chamado PERMAWEB_KEY para este projeto. O valor do segredo deve ser a string codificada em base64 da carteira de implantação.

```console
base64 -i wallet.json | pbcopy
```

Para que esta implantação funcione, você precisará financiar a conta de bundlr dessa carteira, certifique-se de ter algum $AR na carteira que você usará, não muito, talvez .5 AR, então use a CLI de Bundlr para financiar.

```console
npx bundlr 250000000000 -h https://node2.bundlr.network -w wallet.json -c arweave
```

::: warning
Mantenha esta carteira com pouco saldo e use-a apenas para este projeto.
:::

:tada: Você configurou uma ação do Github para automatizar completamente sua implantação na permaweb!