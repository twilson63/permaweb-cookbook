---
locale: es
---
# ArProfile
ArProfile es una DID nativa de Arweave.

El protocolo de cuenta subyacente tiene como objetivo satisfacer las necesidades esenciales de las interacciones sociales entre usuarios: un avatar, un identificador único, un nombre y una biografía. También incluye la posibilidad de agregar cuentas de las redes sociales más conocidas como Twitter, Discord, Github, Instagram y Facebook.

## Instalación
Agregue el paquete usando npm:
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

## Uso de ArProfile
```js:no-line-numbers
import Account from 'arweave-account'
const account = new Account(opts);
```

Se pueden pasar argumentos opcionales al constructor. Aquí se muestran las opciones predeterminadas:
```js:no-line-numbers
const opts = {
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 60
};
```

::: tip
El almacenamiento en caché almacenará la información de perfil relevante en su almacenamiento local para que las solicitudes futuras de estos datos puedan ser atendidas mucho más rápido. La duración que se almacena se especifica en las opciones pasadas.
:::

#### Obtener perfil por dirección
Para recuperar información de cuenta usando una dirección de Arweave, dentro de una función asíncrona pase la dirección de usuario a la función `get`

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
    "bio": "Fundador de Metaweave.xyz\nAmo a los perros",
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

#### Obtener perfil por identificador
Una dirección de Arweave puede estar vinculada a múltiples ArProfile. Para recuperar información de cuenta usando un identificador de ArProfile existente, dentro de una función asíncrona pase el identificador de usuario a la función `search`

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
      "name": "cromatikap en movimiento",
      "bio": "cuenta móvil",
      "email": "",
      "links": {},
      "wallets": {}
    }
  },
  {...}, // más perfiles
  {...}
]
```

#### Obtener perfil por identificador único
Para recuperar información de cuenta usando una dirección de Arweave, dentro de una función asíncrona pase el identificador de usuario y el identificador único a la función `search`

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
    "bio": "cuenta de prueba por cromatikap\nACTUALIZACIÓN",
    "email": "",
    "links": {
      "github": "cromatikap",
      "twitter": "cromatikap"
    },
    "wallets": {}
  }
}
```

## Resumen
Con tan solo 3 líneas de código necesarias para implementar, ArProfile es una forma sencilla de agregar información adicional del usuario de Arweave como avatares, biografías y enlaces sociales a tus aplicaciones.

[ArProfile](https://arprofile.arweave.dev)