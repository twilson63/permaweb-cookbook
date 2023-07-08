---
locale: pt
---
# ArProfile
ArProfile é um DID nativo do Arweave

O protocolo de conta subjacente tem como objetivo satisfazer necessidades essenciais para interações sociais entre usuários: um avatar, um identificador único, um nome e uma biografia. Também inclui a possibilidade de adicionar contas das redes sociais bem conhecidas como Twitter, Discord, Github, Instagram e Facebook.
## Instalação
Adicione o pacote usando npm:
<CodeGroup>
  <CodeGroupItem title="NPM">

```console
npm install arweave-account
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```console
yarn add arweave-account
```

  </CodeGroupItem>
</CodeGroup>

## Usando o ArProfile
```js:no-line-numbers
import Account from 'arweave-account'
const account = new Account(opts);
```

Argumentos opcionais podem ser passados para o construtor. Aqui estão as opções padrão:
```js:no-line-numbers
const opts = {
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 60
};
```

::: dica
O armazenamento em cache armazenará as informações relevantes do perfil em seu armazenamento local para que solicitações futuras desses dados possam ser atendidas muito mais rapidamente. A duração armazenada é especificada nas opções passadas.
:::

#### Obter Perfil pelo Endereço
Para recuperar informações da conta usando um endereço do Arweave, dentro de uma função assíncrona, passe o endereço do usuário para a função `get`

```js:no-line-numbers
await account.get("aIUmY9Iy4qoW3HOikTy6aJww-mM4Y-CUJ7mXoPdzdog")

{
  "txid": "NPJJoq-9EwUeAce_bSbSyqICaGs4_7Hg6VxCyoCY8UQ",
  "addr": "aIUmY9Iy4qoW3HOikTy6aJww-mM4Y-CUJ7mXoPdzdog",
  "handle": "@cromatikap#aIUdog",
  "profile": {
    "handleName": "cromatikap",
    "avatar": "xqjVvn9b8hmtDJhfVw80OZzAsn-ErpWbaFCPZWG5vKI",
    "avatarURL": "https://arweave.net/xqjVvn9b8hmtDJhfVw80OZzAsn-ErpWbaFCPZWG5vKI",
    "banner": "ar://a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
    "bannerURL": "https://arweave.net/a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
    "name": "Axel",
    "bio": "Fundador do Metaweave.xyz\nEu amo cachorros",
    "email": "",
    "links": {
      "twitter": "cromatikap",
      "github": "cromatikap",
      "instagram": "cromatikap",
      "discord": "cromatikap#6039"
    },
    "wallets": {}
  }
}
```

#### Obter Perfil pelo Identificador
Um endereço do Arweave pode estar vinculado a vários ArProfile's. Para recuperar informações da conta usando um identificador ArProfile existente, dentro de uma função assíncrona, passe o identificador do usuário para a função `search`

```js:no-line-numbers
await account.search("cromatikap")

[
  {
    "txid": "H0qHXb2mC3Y1zRZcSczZ-fp4UytCxSJDhO7j9DP2wQE",
    "addr": "Y4P1UzeAgQNU169vhYo3Cdx4-gevKvaBWCfkoG-ajU8",
    "handle": "@cromatikap#Y4PjU8",
    "profile": {
      "handleName": "cromatikap",
      "avatar": "ar://xpuHFNujK8K6_1SHRn4KPLxkHZKfIryEjXIDYkKwRtE",
      "avatarURL": "https://arweave.net/xpuHFNujK8K6_1SHRn4KPLxkHZKfIryEjXIDYkKwRtE",
      "banner": "ar://a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
      "bannerURL": "https://arweave.net/a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
      "name": "cromatikap em movimento",
      "bio": "conta móvel",
      "email": "",
      "links": {},
      "wallets": {}
    }
  },
  {...}, // mais perfis
  {...}
]
```

#### Obter Perfil pelo Identificador Único
Para recuperar informações da conta usando um endereço do Arweave, dentro de uma função assíncrona, passe o identificador do usuário e o identificador único para a função `search`

```js:no-line-numbers
await account.search("cromatikap#aIUdog")

{
  "txid": "_DGURgOAih5p2vTyaEu9_bBDpZv81rctPO2q9cpOFS0",
  "addr": "HDCwh7xJcIK23vx1blxysTnUpqy1PEzAb5Am84ZdERA",
  "handle": "@cromatikap#HDCERA",
  "profile": {
    "handleName": "cromatikap",
    "avatar": "ar://OrG-ZG2WN3wdcwvpjz1ihPe4MI24QBJUpsJGIdL85wA",
    "avatarURL": "https://arweave.net/OrG-ZG2WN3wdcwvpjz1ihPe4MI24QBJUpsJGIdL85wA",
    "banner": "ar://a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
    "bannerURL": "https://arweave.net/a0ieiziq2JkYhWamlrUCHxrGYnHWUAMcONxRmfkWt-k",
    "name": "Axel",
    "bio": "conta de teste por cromatikap\nATUALIZAÇÃO",
    "email": "",
    "links": {
      "github": "cromatikap",
      "twitter": "cromatikap"
    },
    "wallets": {}
  }
}
```

## Resumo
Com apenas 3 linhas de código necessárias para implementar, ArProfile é uma maneira direta de adicionar informações adicionais de usuário do Arweave, como avatares, biografias e links sociais às suas aplicações.

[ArProfile](https://arprofile.arweave.dev)