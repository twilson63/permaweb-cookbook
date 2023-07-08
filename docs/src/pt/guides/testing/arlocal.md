---
locale: pt
---
# arlocal
`arlocal` é uma ferramenta para configurar e executar rapidamente um ambiente de teste local do Arweave. Ele permite testar transações em um servidor semelhante a um gateway do Arweave. Ele permite que os desenvolvedores testem suas aplicações em um ambiente simulado antes de implantá-las na rede Arweave.

Não são necessários tokens $AR para usar e as transações são instantâneas.

## CLI
Você deve ter o node e o npm instalados em sua máquina para usar o arlocal CLI.

Para iniciar o gateway local, execute `npx arlocal`

::: dica
Você pode especificar em qual porta executar o gateway leve passando sua porta como argumento
`npx arlocal 8080`
:::

Para ocultar os registros, adicione a flag `--hidelogs` ao executar seu gateway
`npx arlocal --hidelogs`

## Node
Instale o pacote como uma dependência de desenvolvimento executando
`yarn add arlocal -D` or `npm install arlocal --save-dev`

```js
import ArLocal from 'arlocal';

(async () => {
  const arLocal = new ArLocal();

  // crie um ambiente de teste local
  await arLocal.start();

  // seus testes aqui

  // desligue o ambiente de teste
  await arLocal.stop();
})();
```

Uma instância `ArLocal` pode ser criada com opções
| Opção | Descrição |
| ---- | ----------- |
| porta | Porta a ser usada |
| showLogs | Mostrar registros |
| dbPath | Diretório para banco de dados temporário |
| persist | Persistir dados entre reinícios do servidor

### Exemplo
Para que este exemplo funcione, o código precisa usar uma carteira de teste gerada. Para isso, o pacote `arweave` deve ser instalado no projeto, junto com o `arlocal`.

`yarn add arweave arlocal -D` or `npm install --save-dev arweave arlocal`

Abaixo está um teste básico em JavaScript para criar uma transação de dados e enviá-la para o Arweave usando o arlocal:

```js
import ArLocal from 'arlocal'
import Arweave from 'arweave'

test('test transaction', async () => {
    // criar e iniciar uma instância de ArLocal
    const arLocal = new ArLocal()
    await arLocal.start()
    // criar gateway Arweave local
    const arweave = Arweave.init({
    host: 'localhost',
    port: 1984,
    protocol: 'http'
  })
  // gerar carteira
  const wallet = await arweave.wallets.generate()
  // enviar quantidade de tokens (em winston) para a carteira
  await arweave.api.get(`mint/${addr}/10000000000000000`)
  // criar função mine
  const mine = () => arweave.api.get('mine')
  try {
    // criar transação
    let transaction = await arweave.createTransaction({
      data: '<html><head><meta charset="UTF-8"><title>Hello world!</title></head><body></body></html>'
    }, wallet);
    // assinar e enviar a transação
    await arweave.transactions.sign(transaction, wallet);
    const response = await arweave.transactions.post(transaction);
    // minerar a transação
    await mine()
    // testar a resposta
  } catch(err) {
    console.error('ERRO: ', err.message)
  }
  // desligar o ambiente de teste
  await arLocal.stop()
})
```

::: advertência
Os resultados dos testes de transações L1 podem diferir das transações L2.
:::

## Recursos
[arlocal docs](https://github.com/textury/arlocal)