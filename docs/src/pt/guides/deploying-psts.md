---
locale: pt
---
# Criando e Implementando um PST

### **Pré-requisitos**

---

Antes de começar a criar o seu PST, você precisará ter o **NodeJS/NPM** instalado.

### **Primeiros Passos**

---

Contratos SmartWeave podem ser divididos em duas partes:

- **O Contrato** (a lógica real por trás do token)
- **Estado Inicial** (algumas configurações ou configurações que queremos que nosso token tenha)

Neste guia, vamos criar ambos.

**Configurando um Ambiente Local**

Execute `npm install arweave arlocal warp-contracts`.

Isso fornecerá funções para criar e implantar um PST.

### **Configurando o Contrato**

---

O PST requer alguma configuração inicial antes da implantação, como o nome do token e a quantidade do token.

Crie um arquivo de configuração que se parece com isso:

```json
// initial-state.json
{
  "ticker": "TEST_PST",
  "name": "Test PST",
  "owner": "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo",
  "balances": {
      "G1mQ4_jjcca46JqR1kEt0yKvhaw6EUrXLiEwebMvSwo": 1000,
      "Jo9BZOaIVBDIhyKDiSnJ1bIU4usT1ZZJ5Kl6M-rBFdI": 1000,
  }
}

```

Isso define algumas opções iniciais para o PST. Salve-o como `initial-state.json`.

- **`ticker`** - símbolo do token (ex. BTC, ETH)
- **`name`** - nome do token
- **`owner`** - endereço do proprietário do contrato
- **`balances`** - endereços para distribuir os tokens iniciais

### Escrevendo o Contrato

O contrato PST deve ter uma única função, `handle`, que recebe dois argumentos:

`state`, que é o estado atual do contrato, e `action`, que é a ação que você deseja realizar (ex. transferir tokens).

Ao fazer uma chamada para o contrato PST, ele deve retornar uma das duas coisas:
- **`state`** - se a chamada ao contrato alterar o estado (ex. fazer uma transferência).
- **`result`** - se a chamada **não** alterar o estado (ex. ver um saldo).

Caso contrário, ele deve gerar uma **`error`** se a chamada for inválida ou falhar.

Primeiro, vamos definir a função principal `handle`.
```js
//contract.js
export function handle(state, action) {
  let balances = state.balances;
  let input = action.input;
  let caller = action.caller;
}
```
Isso configura algumas variáveis para interações comuns que o contrato inteligente usa.

Agora vamos adicionar o primeiro tipo de entrada que irá alterar o estado. Isso permite que o proprietário do contrato cunhe novos PSTs para seu endereço de carteira.

```js
  if (input.function == 'mint') {
    let qty = input.qty;

  if (qty <= 0) {
    throw new ContractError('Cunhagem inválida de token');
  }

  if (!Number.isInteger(qty)) {
    throw new ContractError('Valor inválido para "qty". Deve ser um número inteiro');
  }

  if(caller != state.owner) {
    throw new ContractError('Apenas o proprietário do contrato pode cunhar novos tokens.');
  }

  balances[caller] ? (balances[caller] += qty) : (balances[caller] = qty);
  return { state };
  }
```
A próxima função irá lidar com transferências de PSTs entre carteiras.

```js
if (input.function == 'transfer') {

    let target = input.target;
    let qty = input.qty;

    if (!Number.isInteger(qty)) {
      throw new ContractError(`Valor inválido para "qty". Deve ser um número inteiro`);
    }

    if (!target) {
      throw new ContractError(`Nenhum destino especificado`);
    }

    if (qty <= 0 || caller == target) {
      throw new ContractError('Transferência de token inválida');
    }

    if (balances[caller] < qty) {
      throw new ContractError(`Saldo do chamador não é suficiente para enviar ${qty} token(s)!`);
    }

    // Reduza o saldo do chamador
    balances[caller] -= qty;
    if (target in balances) {
      // A carteira já existe no estado, adicione novos tokens
      balances[target] += qty;
    } else {
      // A carteira é nova, defina o saldo inicial
      balances[target] = qty;
    }

    return { state };
  }
```
Vamos também adicionar uma forma de ver o saldo do PST de uma carteira de destino.

```js
if (input.function == 'balance') {

    let target = input.target;
    let ticker = state.ticker;
    
    if (typeof target !== 'string') {
      throw new ContractError(`Deve especificar o destino para obter o saldo`);
    }

    if (typeof balances[target] !== 'number') {
      throw new ContractError(`Não é possível obter o saldo, o destino não existe`);
    }

    return { result: { target, ticker, balance: balances[target] } };
  }
```
E finalmente, vamos gerar um erro se a entrada fornecida não for a função `mint`, `transfer` ou `balance`.

```js
throw new ContractError(`Nenhuma função fornecida ou função não reconhecida: "${input.function}"`);
```

### **Implantando o Contrato**

Para implantar um contrato, precisamos escrever um script NodeJS que funcionará com o Warp para implantar nosso contrato.

Crie um arquivo chamado `deploy-contract.js` e comece importando `WarpFactory`.

```js
import { WarpFactory } from 'warp-contracts/mjs'
```
Em seguida, inicialize uma instância do Warp.

Você pode substituir `forMainnet()` por `forLocal()` ou `forTestnet()`, dependendo de onde você deseja implantar seu contrato.
```js
const warp = WarpFactory.forMainnet();
```

Agora que temos o Warp configurado, você precisará de uma carteira para implantar o contrato. Você pode usar seu próprio arquivo de chave local:

```js
const walletAddress = "caminho/para/carteira.json"
```
 ou, gerar uma nova carteira através do Warp usando o seguinte código:

```js
const jwk = await warp.arweave.wallets.generate();
const walletAddress = await warp.arweave.wallets.jwkToAddress(jwk);
```
Transações abaixo de 100KB são gratuitas, então você nem precisa financiar a carteira!

---

Antes de implantar o contrato, precisamos ler o arquivo de estado inicial e o arquivo do contrato.

```js
const contract = fs.readFileSync(path.join(__dirname, 'contract.js'), 'utf8');
const state = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'initial-state.json'), 'utf8')
);
```
Se você gerou uma nova carteira para implantar a partir, você precisará substituir o `owner` no estado inicial. Você pode fazer isso com o seguinte código:
```js
const initialState = {
  ...stateFromFile,
  ...{
    owner: walletAddress,
  },
};
```
Se você estiver usando uma carteira, você pode editar diretamente o arquivo `initial-state.json` para usar o endereço da sua carteira.

O código a seguir lida com a implantação do contrato:

```js
const contractTxId = await warp.createContract.deploy({
  wallet,
  initState: JSON.stringify(initialState),
  src: contractSrc,
});

console.log('Implantação concluída: ', {
  ...result,
  sonar: `https://sonar.warp.cc/#/app/contract/${result.contractTxId}`
});
```

Execute o script com `node deploy-contract.js`, que implantará seu contrato e registrará o ID da transação do contrato no terminal para você usar.

---

**Fonte e Leitura Adicional**: [Documentação Warp](https://academy.warp.cc/tutorials/pst/introduction/intro)